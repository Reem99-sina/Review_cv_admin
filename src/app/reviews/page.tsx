"use client";

import { useDeleteReview, useReviews } from "@/action/review";
import StableButton from "@/components/common/button";
import DataTable, { Column } from "@/components/common/table";

import { Resume, Review } from "@prisma/client";

export default function ReviewsPage() {
  const { data, isLoading } = useReviews();

  const reviews: Review[] = data?.reviews || [];

  const { mutate: deleteReview } = useDeleteReview();

  const columns = [
    {
      key: "resume",
      label: "Resume ",
      render: (value: Resume) => (
        <span className="text-gray-300 text-xs">{value?.title}</span>
      ),
    },
    {
      key: "ats_score",
      label: "ATS Score",
      render: (value: number) => (
        <span
          className={
            value >= 80
              ? "text-green-700 font-bold"
              : value >= 50
                ? "text-yellow-600 font-bold"
                : "text-red-700 font-bold"
          }
        >
          {value}
        </span>
      ),
    },
    {
      key: "created_at",
      label: "Created At",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "id",
      label: "Actions",
      render: (_, row: any) => (
        <div className="flex gap-2">
          {/* View Details */}
          <StableButton
            onClick={() => window.open(`/reviews/${row.id}`, "_blank")}
            className="px-2 py-1 text-xs bg-blue-600 text-white rounded"
          >
            View
          </StableButton>

          {/* Delete */}
          <StableButton
            onClick={() => deleteReview(row.id)}
            className="px-2 py-1 text-xs bg-red-600 text-white rounded"
          >
            Delete
          </StableButton>
        </div>
      ),
    },
  ] as Column<Review>[];

  if (isLoading) {
    return <div className="p-6 text-white">Loading reviews...</div>;
  }

  return (
    <div className="p-6 w-full">
      <h1 className="text-xl font-bold mb-4">Reviews</h1>

      <DataTable<Review> columns={columns} data={reviews} />
    </div>
  );
}
