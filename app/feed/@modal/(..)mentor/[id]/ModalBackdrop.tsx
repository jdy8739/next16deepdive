"use client";

import { useRouter } from "next/navigation";

// 모달 아래의 클릭 차단 + dim 배경.
// <dialog> 의 ::backdrop(그림자) 대신, 화면 전체를 덮는 고정 배경 div 를 두어:
// 1) 뒤의 피드가 어두워지고 2) 배경 클릭이 아무 동작도 못 하며(차단)
// 3) 배경 자체를 클릭하면 router.back() 으로 모달을 닫는다.
const ModalBackdrop = () => {
  const router = useRouter();

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-40 cursor-default bg-zinc-900/60 backdrop-blur-sm"
      onClick={() => router.back()}
    />
  );
};

export default ModalBackdrop;
