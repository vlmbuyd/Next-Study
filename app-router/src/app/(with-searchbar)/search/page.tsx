import BookItem from "@/components/book-item";
import { BookData } from "@/types";

// interface SearchPageProps {
//   // {} 대신 Record<never, never> 또는 object 사용
//   params: Promise<Record<never, never>>;
//   searchParams: Promise<Record<string, string | string[] | undefined>>;
// }

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${searchParams.q}`
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
