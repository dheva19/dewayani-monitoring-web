"use client";

import React, { createContext, useContext, useState, useRef, ReactNode } from "react";
import mqtt, { MqttClient } from "mqtt";

type SensorData = {
  ultrasonic: {
    sensor_1: number;
    sensor_2: number;
    sensor_3: number;
    sensor_4: number;
    sensor_5: number;
    sensor_6: number;
  };
  imu: {
    yaw: number;
    pitch: number;
    roll: number;
  };
  timestamp: number;
};

type RobotContextType = {
  ip: string;
  status: "idle" | "connecting" | "connected" | "error";
  sensorData: SensorData | null;
  connect: (ipAddress: string) => Promise<void>;
  disconnect: () => void;
  sendCommand: (x: number, y: number, omega: number) => void;
};

const RobotContext = createContext<RobotContextType | undefined>(undefined);

export function RobotProvider({ children }: { children: ReactNode }) {
  const [ip, setIp] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "error">("idle");
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const clientRef = useRef<MqttClient | null>(null);

  const connect = (ipAddress: string) => {
    return new Promise<void>((resolve, reject) => {
      setStatus("connecting");
      setIp(ipAddress);

      const brokerUrl = `ws://${ipAddress}:9001`;
      const client = mqtt.connect(brokerUrl, {
        reconnectPeriod: 5000,
      });

      client.on("connect", () => {
        setStatus("connected");
        client.subscribe("robot/sensor_data");
        clientRef.current = client;
        resolve();
      });

      client.on("message", (topic, message) => {
        if (topic === "robot/sensor_data") {
          try {
            const data: SensorData = JSON.parse(message.toString());
            setSensorData(data);
          } catch (e) {
            console.error("Gagal parsing data sensor", e);
          }
        }
      });

      client.on("error", (err) => {
        setStatus("error");
        client.end();
        reject(err);
      });
    });
  };

  const disconnect = () => {
    if (clientRef.current) {
      clientRef.current.end();
      clientRef.current = null;
    }
    setStatus("idle");
    setSensorData(null);
    setIp("");
  };

  const sendCommand = (x: number, y: number, omega: number) => {
    if (clientRef.current && status === "connected") {
      const payload = JSON.stringify({ x, y, omega });
      clientRef.current.publish("robot/cmd_vel", payload);
    }
  };

  return (
    <RobotContext.Provider value={{ ip, status, sensorData, connect, disconnect, sendCommand }}>
      {children}
    </RobotContext.Provider>
  );
}

export function useRobot() {
  const context = useContext(RobotContext);
  if (context === undefined) {
    throw new Error("useRobot must be used within a RobotProvider");
  }
  return context;
}