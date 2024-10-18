import ClientComponent from "@/legacy_app/components/clinet-component";

interface SearchPageProps {
  // {} 대신 Record<never, never> 또는 object 사용
  params: Promise<Record<never, never>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Page({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <div>
      Search 페이지 {resolvedSearchParams.q}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
}
