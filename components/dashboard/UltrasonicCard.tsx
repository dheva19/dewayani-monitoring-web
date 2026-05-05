"use client";

import { Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRobot } from "@/context/RobotContext";

const ULTRASONIC_LABELS: Record<string, { id: string; label: string }> = {
  sensor_1: { id: "US-1", label: "Depan" },
  sensor_2: { id: "US-2", label: "Kanan Depan" },
  sensor_3: { id: "US-3", label: "Kanan Belakang" },
  sensor_4: { id: "US-4", label: "Belakang" },
  sensor_5: { id: "US-5", label: "Kiri Belakang" },
  sensor_6: { id: "US-6", label: "Kiri Depan" },
  sensor_7: { id: "US-7", label: "Gripper" },
};

const MAX_CM = 200;

function getBarColor(value: number, max: number) {
  return value / max < 0.35 ? "bg-amber-400" : "bg-sky-400";
}

export default function UltrasonicCard() {
  const { sensorData } = useRobot();
  const ultrasonic = sensorData?.ultrasonic;

  return (
    <Card className="border-border shadow-md dark:shadow-none flex flex-col h-full">
      <CardHeader className="pb-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
            <Gauge size={18} className="text-sky-500" />
          </div>
          <div>
            <CardTitle className="text-base">Ultrasonic</CardTitle>
            <CardDescription className="text-xs">7 sensor proximity (cm)</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
        <div className="flex flex-col gap-2.5">
          {Object.entries(ULTRASONIC_LABELS).map(([key, meta]) => {
            const value = ultrasonic?.[key as keyof typeof ultrasonic] ?? 0;
            const pct = Math.min((value / MAX_CM) * 100, 100);
            return (
              <div key={key} className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span className="font-medium">{meta.id} · {meta.label}</span>
                  <span>{value.toFixed(1)} cm</span>
                </div>
                <div className="relative h-4 rounded-md bg-secondary overflow-hidden">
                  <div
                    className={`h-full rounded-md transition-all duration-200 ${getBarColor(value, MAX_CM)}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}