import { io, Socket } from "socket.io-client";
import { ClientEvents, ServerEvents } from "./types/socket.types";
import { SERVER } from "@shared/constants/server";


export const socket: Socket<ServerEvents, ClientEvents> = io(`http://${SERVER.host}:${SERVER.port}`, {
    autoConnect: false
})