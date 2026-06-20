"use client";

import DataTable, { Column } from "@/components/common/table";
import {
  useDeleteUser,
  useUpgradeUser,
  useUsers,
} from "@/action/mainDashboard";
import { User } from "@prisma/client";
import StableButton from "@/components/common/button";



export default function UsersPage() {
  const { data, isLoading } = useUsers();

  const users: User[] = data?.users || [];
  const { mutate: upgradeUser } = useUpgradeUser();
  const { mutate: deleteUser } = useDeleteUser();

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
      render: (value: string) => (
        <span
          className={
            value === "ADMIN" ? "text-red-500 font-bold" : "text-gray-300"
          }
        >
          {value}
        </span>
      ),
    },
    {
      key: "plan",
      label: "Plan",
      render: (value: string) => (
        <span
          className={
            value === "PRO" ? "text-green-700 font-bold" : "text-yellow-600"
          }
        >
          {value}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "id",
      label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2 items-center">
          {/* Upgrade */}
          <StableButton
            onClick={() => upgradeUser({ userId: row.id })}
            className="px-2 py-1 text-xs bg-green-600 text-white rounded"
          >
            Upgrade
          </StableButton>

          {/* Delete */}
          <StableButton
            onClick={() => deleteUser({ userId: row.id })}
            className="px-2 py-1 text-xs bg-red-600 text-white rounded"
          >
            Delete
          </StableButton>

          {/* Active / Verify */}
          <span
            className={`px-2 py-1 text-xs rounded ${
              row.isVerified
                ? "bg-blue-600 text-white"
                : "bg-yellow-500 text-black"
            }`}
          >
            {row.isVerified ? "Active" : "Pending"}
          </span>
        </div>
      ),
    },
  ] as Column<User>[];

  if (isLoading) {
    return <div className="p-6 text-white">Loading users...</div>;
  }

  return (
    <div className="p-6 w-full">
      <h1 className="text-xl font-bold mb-4">Users</h1>

      <DataTable<User> columns={columns} data={users} />
    </div>
  );
}
