import { notFound } from "next/navigation";
import style from "./page.module.css";
import { createReviewAction } from "@/actions/create-review.action";

// generateStaticParams에서 설정한 url 파라미터 외에는 404 페이지로 리다이렉트 시키고 싶다면..
// export const dynamicParams = false;
// dynamicParams = true로 설정하거나 변수 선언을 생략하면, (ex. id: 4)같은 페이지는 실시간으로 생성하여  응답

// 동적 경로를 갖는 페이지 파라미터들을 미리 build 타임에 렌더링 되도록 설정
// Page 컴포넌트에서 캐싱하지 않더라도 이 페이지는 정적 페이지로 강제 설정 -> 풀 라우트 캐시
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다..</div>;
  }

  const book = await response.json();
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} alt="cover-image" />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form action={createReviewAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <input required name="content" placeholder="리뷰 내용" />
        <input required name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
}

type BookPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params }: BookPageProps) {
  const resolvedParams = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={resolvedParams.id} />
      <ReviewEditor bookId={resolvedParams.id} />
    </div>
  );
}
