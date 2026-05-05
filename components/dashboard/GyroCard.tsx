"use client";

import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRobot } from "@/context/RobotContext";

export default function GyroCard() {
  const { sensorData } = useRobot();
  const imu = sensorData?.imu;

  return (
    <Card className="border-border shadow-md dark:shadow-none flex flex-col flex-1">
      <CardHeader className="pb-3 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center">
            <Activity size={18} className="text-teal-500" />
          </div>
          <div>
            <CardTitle className="text-base">Orientasi (Gyro)</CardTitle>
            <CardDescription className="text-xs">IMU & Artificial Horizon</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 p-0 justify-center">
        <div className="flex-1 flex items-center justify-center py-6 bg-muted/20 border-b border-border">
          <div className="relative w-40 h-40 rounded-full border-4 border-muted-foreground/20 overflow-hidden shadow-inner bg-sky-400">
            <div
              className="absolute w-[300%] h-[300%] bg-amber-700 transition-transform duration-100 ease-linear"
              style={{
                top: '50%',
                left: '-100%',
                transform: `translateY(${imu?.pitch ?? 0}%) rotate(${-(imu?.roll ?? 0)}deg)`,
                transformOrigin: 'center top'
              }}
            >
              <div className="w-full h-1 bg-white/90 shadow-sm" />
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center drop-shadow-md">
              <div className="flex items-center justify-center gap-4">
                <div className="w-8 h-0.5 bg-white/90" />
                <div className="w-2 h-2 rounded-full border-2 border-white/90" />
                <div className="w-8 h-0.5 bg-white/90" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 grid grid-cols-3 gap-4 text-center shrink-0">
          {[
            { label: "YAW", value: imu?.yaw ?? 0 },
            { label: "PITCH", value: imu?.pitch ?? 0 },
            { label: "ROLL", value: imu?.roll ?? 0 },
          ].map((item) => (
            <div key={item.label} className="flex flex-col">
              <p className="text-[10px] font-semibold text-muted-foreground tracking-widest mb-1">
                {item.label}
              </p>
              <p className="text-lg font-bold text-foreground tabular-nums">
                {item.value.toFixed(1)}°
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}