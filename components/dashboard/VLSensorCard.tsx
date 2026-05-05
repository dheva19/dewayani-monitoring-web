"use client";

import { ScanEye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRobot } from "@/context/RobotContext";

const VL_LABELS: Record<string, { id: string; label: string }> = {
  sensor_1: { id: "VL-1", label: "Depan" },
  sensor_2: { id: "VL-2", label: "Kanan Depan" },
  sensor_3: { id: "VL-3", label: "Kanan Belakang" },
  sensor_4: { id: "VL-4", label: "Belakang" },
  sensor_5: { id: "VL-5", label: "Kiri Belakang" },
  sensor_6: { id: "VL-6", label: "Kiri Depan" },
};

const MAX_VL = 200;

function getBarColor(value: number, max: number) {
  return value / max < 0.35 ? "bg-amber-400" : "bg-sky-400";
}

export default function VLSensorCard() {
  const { sensorData } = useRobot();
  const vl = sensorData?.tof;

  return (
    <Card className="border-border shadow-md dark:shadow-none flex flex-col h-full">
      <CardHeader className="shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
            <ScanEye size={18} className="text-indigo-500" />
          </div>
          <div>
            <CardTitle className="text-base">Sensor VL</CardTitle>
            <CardDescription className="text-xs">6 sensor jarak presisi</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {Object.entries(VL_LABELS).map(([key, meta]) => {
            const value = vl?.[key as keyof typeof vl] ?? 0;
            const pct = Math.min((value / MAX_VL) * 100, 100);
            return (
              <div key={key} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span className="font-medium">{meta.id} · {meta.label}</span>
                  <span>0–{MAX_VL}</span>
                </div>
                <div className="relative h-6 rounded-md bg-secondary overflow-hidden">
                  <div
                    className={`h-full rounded-md transition-all duration-200 ${getBarColor(value, MAX_VL)}`}
                    style={{ width: `${pct}%` }}
                  />
                  <span className="absolute inset-0 flex items-center px-3 text-xs font-semibold text-white drop-shadow">
                    {value.toFixed(1)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}