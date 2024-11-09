"use server";

import { revalidatePath } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    console.log(response.status);

    // 경로에 해당하는 페이지(내부에 있는 요소 모두) 재생성(재검증) 요청 -> 리뷰 데이터 실시간 반영
    // 서버 측에서만 요청 가능 -> 서버 액션, 서버 컴포넌트에서만 요청 가능
    revalidatePath(`/book/${bookId}`);
  } catch (error) {
    console.error(error);
    return;
  }
}
