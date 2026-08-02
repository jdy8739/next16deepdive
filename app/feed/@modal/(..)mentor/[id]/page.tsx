import { Suspense } from "react";
import MentorModal from "./MentorModal";
import ModalBackdrop from "./ModalBackdrop";

// 인터셉트 모달 오버레이.
// ModalBackdrop: 화면 전체를 덮는 dim + 클릭 차단 배경 (모달 밖 클릭 시 닫기).
// MentorModal: 네이티브 <dialog> 카드 (backdrop 은 위 div 가 담당).
const MentorModalOverlay = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return (
    <Suspense>
      <ModalBackdrop />
      <MentorModal params={params} />
    </Suspense>
  );
};

export default MentorModalOverlay;
