"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRobot } from "@/context/RobotContext";

export default function CommandCard() {
  const { sendCommand } = useRobot();
  const [cmd, setCmd] = useState({ x: "0", y: "0", omega: "0" });

  const handleSendCommand = () => {
    sendCommand(
      parseFloat(cmd.x) || 0,
      parseFloat(cmd.y) || 0,
      parseFloat(cmd.omega) || 0
    );
  };

  return (
    <Card className="border-border shadow-md dark:shadow-none flex flex-col h-fit">
      <CardHeader className="pb-3 shrink-0">
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
      
      <CardContent className="flex flex-col gap-4 flex-1 justify-center">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "X", key: "x" },
            { label: "Y", key: "y" },
            { label: "ω", key: "omega" },
          ].map(({ label, key }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-center text-muted-foreground">{label}</Label>
              <Input
                type="number"
                step="0.1"
                value={cmd[key as keyof typeof cmd]}
                onChange={(e) => setCmd((prev) => ({ ...prev, [key]: e.target.value }))}
                className="h-9 text-center bg-background"
              />
            </div>
          ))}
        </div>
        <Button
          className="w-full gap-2 mt-2 shadow-md shadow-primary/30 dark:shadow-none"
          onClick={handleSendCommand}
        >
          <Send size={15} />
          Kirim Perintah
        </Button>
      </CardContent>
    </Card>
  );
}