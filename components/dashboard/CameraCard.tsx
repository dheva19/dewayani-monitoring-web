"use client";

import { Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRobot } from "@/context/RobotContext";

export default function CameraCard() {
  const { ip } = useRobot();
  const videoUrl = `http://${ip}:5000/video_feed`;

  return (
    <Card className="border-border shadow-md dark:shadow-none flex flex-col h-full">
      <CardHeader className="shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
              <Camera size={18} className="text-sky-500" />
            </div>
            <div>
              <CardTitle className="text-base">Robot Vision</CardTitle>
              <CardDescription className="text-xs">Live YOLO feed</CardDescription>
            </div>
          </div>
          <Badge variant="default" className="gap-1.5 text-xs font-semibold text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
            LIVE
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden rounded-b-xl border-t border-border flex-1 flex flex-col">
        <div
          className="relative w-full h-full min-h-60 flex-1 flex flex-col items-center justify-center gap-3"
          style={{
            background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 100%)",
            backgroundImage: `
              linear-gradient(rgba(56,139,253,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56,139,253,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-0">
            <Camera size={40} className="text-slate-500" />
            <p className="text-slate-400 text-sm">Memuat stream...</p>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={videoUrl}
            alt="Live Camera Feed"
            className="absolute inset-0 w-full h-full object-contain z-10 bg-black/40 transition-opacity duration-300"
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
            onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = "1"; }}
          />
        </div>
      </CardContent>
    </Card>
  );
}