type BookPageProps = {
  params: Promise<{
    id: string | string[];
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ params }: BookPageProps) {
  const resolvedParams = await params;

  return <div>Book ID: {resolvedParams.id}</div>;
}
