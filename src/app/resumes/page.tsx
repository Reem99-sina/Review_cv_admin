"use client";

import { useDeleteResume, useResumes } from "@/action/resume";
import StableButton from "@/components/common/button";
import DataTable, { Column } from "@/components/common/table";
import { getFileUrl } from "@/lib/storage";

import { Resume } from "@prisma/client";

export default function ResumesPage() {
  const { data, isLoading } = useResumes();

  const resumes: Resume[] = data?.resumes || [];

  const { mutate: deleteResume } = useDeleteResume();

  const columns = [
    {
      key: "title",
      label: "File Name",
      render: (value: string) => (
        <span className="text-white font-medium">{value || "Untitled"}</span>
      ),
    },
    {
      key: "user",
      label: "User",
      render: (_, row: any) => (
        <span className="text-gray-300">{row.user?.name || "Unknown"}</span>
      ),
    },
    {
      key: "createdAt",
      label: "Upload Date",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "status",
      label: "Status",
      render: (_, row: any) => {
        // derived status (since not in schema)
        const status = row.reviews?.length > 0 ? "Reviewed" : "Pending";

        return (
          <span
            className={
              status === "Reviewed"
                ? "text-green-700 font-bold"
                : "text-yellow-700"
            }
          >
            {status}
          </span>
        );
      },
    },
    {
      key: "id",
      label: "Actions",
      render: (_, row: any) => (
        <div className="flex gap-2 items-center">
          {/* View */}
          <StableButton className="px-2 py-1 text-xs bg-blue-600 text-white rounded">
            <a href={getFileUrl(row.fileUrl)} target="_blank">
              View
            </a>
          </StableButton>

          {/* Delete */}
          <StableButton
            onClick={() => deleteResume(row.id)}
            className="px-2 py-1 text-xs bg-red-600 text-white rounded"
          >
            Delete
          </StableButton>
        </div>
      ),
    },
  ] as Column<Resume>[];

  if (isLoading) {
    return <div className="p-6 text-white">Loading resumes...</div>;
  }

  return (
    <div className="p-6 w-full">
      <h1 className="text-xl font-bold mb-4">Resumes</h1>

      <DataTable<Resume> columns={columns} data={resumes} />
    </div>
  );
}
