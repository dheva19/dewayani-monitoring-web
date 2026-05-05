"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { WifiOff, Camera, Activity, Gauge, Send, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRobot } from "@/context/RobotContext";
import { useTheme } from "next-themes";

const SENSOR_LABELS: Record<string, { id: string; label: string }> = {
  sensor_1: { id: "US-1", label: "Depan" },
  sensor_2: { id: "US-2", label: "Kanan Depan" },
  sensor_3: { id: "US-3", label: "Kanan Belakang" },
  sensor_4: { id: "US-4", label: "Belakang" },
  sensor_5: { id: "US-5", label: "Kiri Belakang" },
  sensor_6: { id: "US-6", label: "Kiri Depan" },
};

const MAX_CM = 200;

function getBarColor(value: number) {
  return value / MAX_CM < 0.35 ? "bg-amber-400" : "bg-sky-400";
}

export default function DashboardPage() {
  const { ip, status, sensorData, disconnect, sendCommand } = useRobot();
  const router = useRouter();
  const [cmd, setCmd] = useState({ x: "0", y: "0", omega: "0" });

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === "idle" || status === "error") {
      router.push("/");
    }
  }, [status, router]);

  const handleDisconnect = () => {
    disconnect();
    router.push("/");
  };

  const handleSendCommand = () => {
    sendCommand(
      parseFloat(cmd.x) || 0,
      parseFloat(cmd.y) || 0,
      parseFloat(cmd.omega) || 0
    );
  };

  const imu = sensorData?.imu;
  const ultrasonic = sensorData?.ultrasonic;

  const videoUrl = `http://${ip}:5000/video_feed`;

  if (status !== "connected") return null;

  return (
    <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">

      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9">
              <Image src="/img/dewayani.webp" alt="Robot" fill className="object-contain" loading="eager" sizes="100" />
            </div>
            <div>
              <p className="font-bold text-primary leading-tight">Dewayani Monitor</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                Connected · {ip}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9">
              {mounted ? (
                <Button
                  variant="outline"
                  size="icon"
                  className="w-full h-full"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
              ) : (
                <div className="w-full h-full rounded-md border border-border bg-muted/30" />
              )}
            </div>

            <Button
              variant="outline"
              className="gap-2 text-destructive border-destructive/40 hover:bg-destructive/5"
              onClick={handleDisconnect}
            >
              <WifiOff size={15} />
              Disconnect
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 py-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <div className="flex flex-col gap-6">
          <Card className="border-border shadow-md dark:shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
                    <Camera size={18} className="text-sky-500" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Robot Vision</CardTitle>
                    <CardDescription className="text-xs">Live camera feed YOLO</CardDescription>
                  </div>
                </div>
                <Badge variant="destructive" className="gap-1.5 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
                  LIVE
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-hidden rounded-b-xl border-t border-border">
              <div
                className="relative w-full aspect-video flex flex-col items-center justify-center gap-3"
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
                  <p className="text-slate-400 text-sm">Mencoba memuat stream...</p>
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={videoUrl}
                  alt="Live Camera Feed"
                  className="absolute inset-0 w-full h-full object-contain z-10 bg-black/40 transition-opacity duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.opacity = "0";
                  }}
                  onLoad={(e) => {
                    (e.target as HTMLImageElement).style.opacity = "1";
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-md dark:shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
                  <Gauge size={18} className="text-sky-500" />
                </div>
                <div>
                  <CardTitle className="text-base">Sensor Jarak Ultrasonic</CardTitle>
                  <CardDescription className="text-xs">6 sensor proximity (cm)</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {Object.entries(SENSOR_LABELS).map(([key, meta]) => {
                  const value = ultrasonic?.[key as keyof typeof ultrasonic] ?? 0;
                  const pct = Math.min((value / MAX_CM) * 100, 100);
                  return (
                    <div key={key} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span className="font-medium">{meta.id} · {meta.label}</span>
                        <span>0–{MAX_CM}CM</span>
                      </div>
                      <div className="relative h-8 rounded-md bg-secondary overflow-hidden">
                        <div
                          className={`h-full rounded-md transition-all duration-200 ${getBarColor(value)}`}
                          style={{ width: `${pct}%` }}
                        />
                        <span className="absolute inset-0 flex items-center px-3 text-xs font-semibold text-white drop-shadow">
                          {value.toFixed(1)} cm
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="border-border shadow-md dark:shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
                  <Activity size={18} className="text-sky-500" />
                </div>
                <div>
                  <CardTitle className="text-base">Orientasi (Gyro)</CardTitle>
                  <CardDescription className="text-xs">IMU readings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-0 px-6 pb-6">
              {[
                { label: "YAW", value: imu?.yaw ?? 0 },
                { label: "PITCH", value: imu?.pitch ?? 0 },
                { label: "ROLL", value: imu?.roll ?? 0 },
              ].map((item, i, arr) => (
                <div key={item.label}>
                  <div className="py-4">
                    <p className="text-xs font-semibold text-muted-foreground tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className="text-4xl font-bold text-foreground tabular-nums transition-all duration-75">
                      {item.value.toFixed(2)}
                      <span className="text-xl font-normal text-muted-foreground ml-0.5">°</span>
                    </p>
                  </div>
                  {i < arr.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border shadow-md dark:shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
                  <Send size={18} className="text-sky-500" />
                </div>
                <div>
                  <CardTitle className="text-base">Kirim Perintah</CardTitle>
                  <CardDescription className="text-xs">Velocity command</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {[
                { label: "X", key: "x" },
                { label: "Y", key: "y" },
                { label: "ω", key: "omega" },
              ].map(({ label, key }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={cmd[key as keyof typeof cmd]}
                    onChange={(e) => setCmd((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="h-10 bg-background"
                  />
                </div>
              ))}
              <Button
                className="w-full gap-2 mt-1 shadow-md shadow-primary/30 dark:shadow-none"
                onClick={handleSendCommand}
              >
                <Send size={15} />
                Kirim Perintah
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}