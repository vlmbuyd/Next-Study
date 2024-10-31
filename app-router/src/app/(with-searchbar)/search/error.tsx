"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, []);

  return (
    <div>
      <h3>검색과정에서 오류가 발생했습니다</h3>
      <button
        onClick={() => {
          // 콜백 함수 내의 UI 변경 작업들을 "일괄적으로 동시에" 진행
          startTransition(() => {
            // 서버 컴포넌들만 업데이트 가능
            router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트들을 Next 서버 측에서 다시 실행해줄 것을 요청
            reset(); // 에러 상태를 초기화, 컴포넌트들을 다시 렌더링
            // 브라우저 측에서 현재 가지고 있는 데이터 기반으로 페이지 재렌더링 수행
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
