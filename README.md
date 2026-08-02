# next16deepdive

Next.js 16 **Cache Components(`use cache`)** 공부용 데모 레포.

- Next.js 16.2.12 · React 19 · TypeScript · Tailwind v4 · pnpm
- `cacheComponents: true`

## 시작

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build && pnpm start
```

## 라우트

**캐시**
- `/exchange` — `use cache` 결빙: 최초 0.5s 조회 후 새로고침해도 0s

**서버 액션**
- `/prompts` — 서버 액션 CRUD
- `/security/clearance` — `useActionState` 폼 검증
- `/mentoring` — 폼 → 서버 액션 → redirect
- `/admin/login` — 쿠키 인증 (코드 `ARCHITECT_2026`)

**캐시 무효화 (무기)**
- `/board/[id]` — 서버 액션 조회/삭제, JS 없는 HTML Form(=`bind`)
- `/course/[id]` — `revalidateTag`(SWR) vs `updateTag`(⚡ 즉시 동기 붕괴)

**라우팅**
- `/portal`, `/portal/settings` — 병렬 라우트 + 슬롯별 독립 로딩 + `default.tsx` 폴백
- `/feed`, `/mentor/[id]` — 인터셉트 라우트 `@modal` 병렬 슬롯으로 `<dialog>` 모달 오버레이

## 메모

- `"use cache"` + `cacheLife` → **컴포넌트 결과 자체**를 결빙.
- 캐시 무효화: `revalidatePath`(다이/경로 즉시) · `revalidateTag(tag,"max")`(SWR 배경 갱신) · `updateTag`(서버 액션만, 즉시 동기 만료).
- 조회/삭제를 **둘 다 서버 액션**으로 하면 같은 db 인스턴스를 써서 실측 문제(인스턴스 분리)를 피함. `src/lib/db.ts` 공용.
- `next dev` = Turbopack. 일부 라우트는 데모용 인위 지연 포함.
