"use client";


import { useActivity } from "@/action/mainDashboard";

export default function RecentActivity() {
  const { data } = useActivity()

  return (
    <div className="w-full  rounded-xl p-4 shadow-sm border">
      <h2 className="text-lg font-bold mb-4">Recent Activity</h2>

      <div className="space-y-4">

        {/* USERS */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">
            New Users
          </h3>

          {data?.users?.map((u: any) => (
            <p key={u.id} className="text-sm">
              👤 {u.name || "Unknown"} joined recently
            </p>
          ))}
        </div>

        {/* RESUMES */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">
            Resume Uploads
          </h3>

          {data?.resumes?.map((r: any) => (
            <p key={r.id} className="text-sm">
              📄 {r.user?.name || "User"} uploaded resume
            </p>
          ))}
        </div>

        {/* REVIEWS */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">
            AI Reviews
          </h3>

          {data?.reviews?.map((rv: any) => (
            <p key={rv.id} className="text-sm">
              🤖 AI reviewed {rv.resume?.user?.name || "User"} resume
            </p>
          ))}
        </div>

      </div>
    </div>
  );
}