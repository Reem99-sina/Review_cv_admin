import { ReviewDetail } from "@/components/reviewDetail";

export default async function ReviewDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const param = await params;

  return <ReviewDetail id={param?.id} />;
}
