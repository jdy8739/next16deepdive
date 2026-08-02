// 병렬 라우트를 이용한 인터셉트 오버레이.
// children 은 /feed 배경 목록으로 그대로 유지되고, @modal 슬롯이 인터셉트 모달과
// 매칭되면 고정(fixed) 오버레이로 "이전 페이지 위에" 렌더된다.
// @modal 이 매칭되지 않으면 default.tsx(null) 가 오버레이를 없앤다.
export default function FeedLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
