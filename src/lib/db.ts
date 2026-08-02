const db = {
  prompts: [
    {
      id: "1",
      content: "This is a prompt",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      content: "This is another prompt",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      content: "This is a third prompt",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  mentoringApplications: [
    {
      id: "1",
      name: "홍길동",
      subject: "Next.js 정적 캐시 파괴 메커니즘",
      createdAt: new Date().toISOString(),
    },
  ],
  cartItems: [
    {
      id: "1",
      product: "soup",
      descriptions: "tasty soup",
      maxStock: 8,
      count: 1,
    },
    {
      id: "2",
      product: "bread",
      descriptions: "fresh bread",
      maxStock: 5,
      count: 1,
    },
  ],
  auth: [
    {
      authCode: "ARCHITECT_2026",
    },
  ],
};

export default db;
