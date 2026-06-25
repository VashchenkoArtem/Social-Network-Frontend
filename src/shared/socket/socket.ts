import { io, Socket } from "socket.io-client";
import { ClientEvents, ServerEvents } from "./types/socket.types";
import { SERVER_URL } from "@shared/constants/server";


export const socket: Socket<ServerEvents, ClientEvents> = io(`${SERVER_URL}`, {
    autoConnect: false
})