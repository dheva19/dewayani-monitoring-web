"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRobot } from "@/context/RobotContext";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CameraCard from "@/components/dashboard/CameraCard";
import UltrasonicCard from "@/components/dashboard/UltrasonicCard";
import VLSensorCard from "@/components/dashboard/VLSensorCard";
import GyroCard from "@/components/dashboard/GyroCard";
import CommandCard from "@/components/dashboard/CommandCard";

export default function DashboardPage() {
  const { status } = useRobot();
  const router = useRouter();

  useEffect(() => {
    if (status === "idle" || status === "error") {
      router.push("/");
    }
  }, [status, router]);

  if (status !== "connected") return null;

  return (
    <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto w-full px-6 py-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-stretch">
        <div className="flex flex-col gap-6 h-full">
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-auto">
            <CameraCard />
            <UltrasonicCard />
          </div>

          <VLSensorCard />
        </div>

        <div className="flex flex-col gap-6 h-full">
          <GyroCard />
          <CommandCard />
        </div>
      </main>
    </div>
  );
}