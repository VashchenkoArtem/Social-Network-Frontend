import { SERVER } from "@shared/constants/server";

export function getAvatar(filename: string | null){
    if (filename){
        return `http://${SERVER.host}:${SERVER.port}/media/thumb/${filename}`
    }
    return `http://${SERVER.host}:${SERVER.port}/media/thumb/defaultAvatar.png`
}