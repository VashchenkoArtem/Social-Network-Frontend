import { useEffect, useState } from "react";
import { socket } from "@shared/socket/socket";

export function useOnlineUsers() {
    const [online, setOnline] = useState<Set<number>>(new Set());

    useEffect(() => {
        const handleOnline = ({ userId }: { userId: number }) => {
            setOnline(prev => new Set(prev).add(userId));
        };

        const handleOffline = ({ userId }: { userId: number }) => {
            setOnline(prev => {
                const copy = new Set(prev);
                copy.delete(userId);
                return copy;
            });
        };

        socket.on("userOnline", handleOnline);
        socket.on("userOffline", handleOffline);

        return () => {
            socket.off("userOnline", handleOnline);
            socket.off("userOffline", handleOffline);
        };
    }, []);

    return online;
}