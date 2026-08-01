"use client";

import { useEffect, useState } from "react";

interface Prompts {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const PromptPage = () => {
  const [prompts, setPrompts] = useState<Prompts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const promptsResponse = await fetch("api/prompts");
        if (!promptsResponse.ok) {
          throw new Error(`Request failed: ${promptsResponse.status}`);
        }
        const prompts = (await promptsResponse.json()) as Prompts[];
        setPrompts(prompts);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!content.trim()) {
      return;
    }

    try {
      const response = await fetch("api/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const newPrompt = (await response.json()) as Prompts;
      setContent("");
      setPrompts((prev) => [...prev, newPrompt]);
    } catch {
      setIsError(true);
    }
  };

  const handleEditStart = (prompt: Prompts) => {
    setEditingId(prompt.id);
    setEditContent(prompt.content);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditContent("");
  };

  const handleEditSave = async (id: string) => {
    if (!editContent.trim()) {
      return;
    }

    try {
      const response = await fetch(`api/prompts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const patchedPrompt = (await response.json()) as Prompts;
      setPrompts((prev) =>
        prev.map((prompt) =>
          prompt.id === id ? patchedPrompt : prompt,
        ),
      );
      setEditingId(null);
      setEditContent("");
    } catch {
      setIsError(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`api/prompts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      setPrompts((prev) => prev.filter((prompt) => prompt.id !== id));
    } catch {
      setIsError(true);
    }
  };

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-2xl px-6 py-14">
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-xl border border-zinc-200 bg-zinc-100"
            />
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto w-full max-w-2xl px-6 py-14">
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          Error loading prompts. Please try again.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Prompts
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {prompts.length} prompt{prompts.length === 1 ? "" : "s"} registered
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mb-10 flex gap-2 rounded-xl border border-zinc-200 bg-white p-2 shadow-sm"
      >
        <input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write a prompt..."
          aria-label="New prompt content"
          className="flex-1 rounded-lg px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          disabled={!content.trim()}
        >
          Register
        </button>
      </form>

      {prompts.length === 0 ? (
        <p className="text-center text-sm text-zinc-400">
          No prompts yet. Register your first prompt above.
        </p>
      ) : (
        <ul className="space-y-3">
          {prompts.map((prompt) => (
            <li
              key={prompt.id}
              className={`rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${
                editingId === prompt.id
                  ? "border-blue-300 ring-2 ring-blue-200"
                  : "border-zinc-200"
              }`}
            >
              {editingId === prompt.id ? (
                <div className="flex items-start justify-between gap-4">
                  <input
                    type="text"
                    value={editContent}
                    onChange={(event) => setEditContent(event.target.value)}
                    aria-label="Edit prompt content"
                    className="min-w-0 flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditSave(prompt.id)}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleEditCancel}
                      className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-zinc-900">{prompt.content}</p>
                    <p className="mt-1.5 text-xs text-zinc-400">
                      Updated {new Date(prompt.updatedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditStart(prompt)}
                      className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-200"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(prompt.id)}
                      className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default PromptPage;
