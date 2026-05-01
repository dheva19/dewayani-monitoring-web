"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wifi, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRobot } from "@/context/RobotContext";

export default function Home() {
  const [inputIp, setInputIp] = useState("");
  const { connect, status } = useRobot(); 
  const router = useRouter();

  const handleConnect = async () => {
    try {
      await connect(inputIp);
      router.push("/dashboard");
    } catch (error) {
      alert("Gagal terhubung. Pastikan IP benar dan Mosquitto WebSocket (Port 9001) menyala.");
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center transition-colors duration-300 bg-linear-to-br from-sky-100 via-blue-50 to-slate-100 dark:from-background dark:via-muted/20 dark:to-background px-4">
      
      <Card className="w-full max-w-md shadow-xl dark:shadow-none rounded-2xl border-transparent dark:border-border">
        
        <CardContent className="flex flex-col items-center gap-6 px-10 pt-12 pb-6">
          <div className="relative w-20 h-20">
            <Image
              src="/img/dewayani.webp"
              alt="Dewayani Monitor"
              fill
              className="object-contain drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
              loading="eager"
              sizes="100"
            />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary dark:text-foreground">
              Dewayani Monitor
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sistem Monitoring Sensor Robot
            </p>
          </div>

          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="ip" className="font-semibold text-foreground">
              Alamat IP Raspberry Pi
            </Label>
            <Input
              id="ip"
              type="text"
              value={inputIp}
              onChange={(e) => setInputIp(e.target.value)}
              className="py-5 bg-background"
              placeholder="192.168.1.100"
            />
            <p className="text-xs text-muted-foreground">
              Masukkan IP address dari robot di jaringan lokal
            </p>

            <Button 
              className="mt-2 py-5 w-full gap-2 shadow-md dark:shadow-none cursor-pointer"
              onClick={handleConnect}
              disabled={status === "connecting"}
            >
              {status === "connecting" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Wifi size={16} />
              )}
              {status === "connecting" ? "Menghubungkan..." : "Connect"}
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 px-10 pb-10">
          <p className="text-xs text-muted-foreground text-center w-full">
            v1.0 · Robot Sensor Monitoring System
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}