"use client";

import { useMainDashboard } from "@/action/mainDashboard";
import { Card } from "@/components/common/card";
import Select from "@/components/common/select";
import { GrowthChart } from "@/components/LineChart";
import { Stats } from "@/types/user";
import {  useMemo, useState } from "react";
import { FaUsers, FaCrown, FaFileAlt, FaRobot } from "react-icons/fa";

const statsConfig = {
  totalUsers: {
    label: "Total Users",
    icon: FaUsers,
  },
  proUsers: {
    label: "Pro Users",
    icon: FaCrown,
  },
  resumes: {
    label: "Resumes",
    icon: FaFileAlt,
  },
  reviews: {
    label: "Reviews",
    icon: FaRobot,
  },
};
const chartOptions = [
  { key: "usersGrowth", label: "Users Growth" },
  { key: "resumesGrowth", label: "Resumes Growth" },
  { key: "reviewsGrowth", label: "Reviews Growth" },
];

export default function Home() {
  const { data } = useMainDashboard();
  const [selectedChart, setSelectedChart] = useState("usersGrowth");
  const stats = useMemo(() => {
    return data?.stats as Stats;
  }, [data]);
  const chartData = useMemo(() => {
    return data?.charts[selectedChart];
  }, [data, selectedChart]);
  const labelChart = useMemo(() => {
    return chartOptions.find((ele) => ele?.key == selectedChart)?.label;
  }, [selectedChart]);


  return (
    <div className="h-full gap-8 flex flex-col flex-1 items-start justify-start bg-zinc-50 font-sans dark:bg-black px-4 pt-28 md:pt-0">
      <div className="flex items-center gap-3 ">
        {stats &&
          Object.entries(stats).map(([key, value]) => {
            const config = statsConfig[key as keyof typeof statsConfig];

            return (
              <Card
                key={key}
                title={config?.label || key}
                value={value}
                icon={
                  config?.icon ? (
                    <config.icon size={24} />
                  ) : (
                    <FaUsers size={24} />
                  )
                }
              />
            );
          })}
      </div>
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Select Chart:</label>

        <Select
          options={chartOptions}
          value={selectedChart}
          onChange={(e) => setSelectedChart(e.target.value)}
        />
      </div>
      <div className="p-4 space-y-6 w-full h-full">
        <GrowthChart
          title={labelChart}
          data={chartData || []}
          color="#3b82f6"
        />
      </div>
    </div>
  );
}
