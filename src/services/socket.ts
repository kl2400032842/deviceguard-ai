"use client";

import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket && typeof window !== "undefined") {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "ws://localhost:4000", {
      autoConnect: false,
      transports: ["websocket"]
    });
  }

  return socket;
}
