"use client";

import { ReactNode, useEffect, useRef } from "react";
import style from "./modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    // 모달 마운트 시 화면에 보여지도록 설정
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal(); // 기본값이 보이지 않도록 설정 되어 있어서 모달 형태로 열어주기
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  // 모달 특성 상 특정 DOM 요소 내부에 종속되기보다
  // 글로벌하게 별도의 최상위 레벨에서 사용되는 것이 더 적절하기 때문에 createPortal 방식 채택
  return createPortal(
    <dialog
      onClose={() => router.back()}
      onClick={(e) => {
        //모달의 배경이 클릭되면 -> 뒤로가기
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
      className={style.modal}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
