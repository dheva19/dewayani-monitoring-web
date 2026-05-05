"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { WifiOff, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useRobot } from "@/context/RobotContext";

export default function DashboardHeader() {
  const { ip, disconnect } = useRobot();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleDisconnect = () => {
    disconnect();
    router.push("/");
  };

  return (
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
            className="gap-2"
            onClick={handleDisconnect}
          >
            <WifiOff size={15} />
            Disconnect
          </Button>
        </div>  
      </div>
    </header>
  );
}