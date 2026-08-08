import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My App",
  description: "My App",
};

// NOTE(cacheComponents): 루트 레이아웃에서 cookie 를 읽으면 전체 앱이 dynamic 으로
// 강제되어 PPR 프리렌더(_not-found, /admin/dashboard, 피드 모달)가 깨진다.
// cacheComponents 가 켜진 상태에선 force-dynamic 도 쓸 수 없어 <html> 의 className 을
// 서버 쿠키로 동기 결정할 수 없다. 그래서 static body 배경은 dark: 유틸리티로 마련하고,
// `dark` 클래스 토글은 클라이언트(VipButton)가 <html> 에 적용한다 (초기값은 서버 쿠키 기반).
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-50">
        {children}
      </body>
    </html>
  );
}
