"use server";

export interface IssueState {
  ok: boolean;
  message?: string;
  attemptCount: number;
  isValidId?: boolean;
}

export const issueSecurityClearance = async (
  prevState: IssueState,
  formData: FormData,
): Promise<IssueState> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });

  const employeeId = String(formData.get("employeeId") ?? "");
  const attemptCount = prevState.attemptCount + 1;

  const isValidId = employeeId.length >= 4;

  if (!isValidId) {
    return {
      ok: false,
      isValidId,
      attemptCount,
    };
  }

  return {
    ok: true,
    isValidId,
    attemptCount,
    message: "[발급 성공] 인가 코드가 발급되었습니다.",
  };
};
