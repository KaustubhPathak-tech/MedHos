import React, { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io("https://video-call-medhos.vercel.app"), []); //https://otivaindustries.net  http://localhost:8001
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
