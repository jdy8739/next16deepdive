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
  insightQuotes: [
    "한걸음 한걸음이 코드의 역사가 된다.",
    "단순함은 구현의 정점이다.",
    "캐시는 은혜로우나 때로는 배신한다.",
    "아키텍트는 미래를 설계하는 청사진가다.",
    "둔한 도구보다 날카로운 사고가 먼저다.",
  ],
  boardSuggestions: [
    { id: "s1", boardId: "1", content: "다크모드를 지원해 주세요.", createdAt: "2026-07-01T09:00:00.000Z" },
    { id: "s2", boardId: "1", content: "페이지네이션 추가가 필요합니다.", createdAt: "2026-07-02T10:30:00.000Z" },
    { id: "s3", boardId: "1", content: "단축키를 개선해 주세요.", createdAt: "2026-07-03T11:45:00.000Z" },
    { id: "s4", boardId: "2", content: "API 문서를 더 풍부하게.", createdAt: "2026-07-04T13:20:00.000Z" },
    { id: "s5", boardId: "2", content: "오프라인 모드를 지원해 주세요.", createdAt: "2026-07-05T15:05:00.000Z" },
  ],
  courseReviews: [
    { id: "r1", courseId: "1", author: "김민수", rating: 5, content: "Next.js 캐시 원리가 확실히 이해됐습니다.", createdAt: "2026-06-10T09:00:00.000Z" },
    { id: "r2", courseId: "1", author: "이서연", rating: 4, content: "실전 예제가 정말 유용했어요.", createdAt: "2026-06-12T14:30:00.000Z" },
    { id: "r3", courseId: "1", author: "박준호", rating: 5, content: "강의 속도와 깊이가 완벽했습니다.", createdAt: "2026-06-15T11:20:00.000Z" },
    { id: "r4", courseId: "2", author: "최유진", rating: 4, content: "use cache 실습이 빛을 발하네요.", createdAt: "2026-06-18T16:45:00.000Z" },
    { id: "r5", courseId: "2", author: "정도현", rating: 5, content: "실무에서 바로 써먹을 수 있습니다.", createdAt: "2026-06-20T10:05:00.000Z" },
  ],
};

export default db;
