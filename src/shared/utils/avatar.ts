import { SERVER } from "@shared/constants/server";

export function getAvatar(filename: string | undefined | null){
    // if (filename){
    //     return `http://${SERVER.host}:${SERVER.port}/media/thumb/${filename}`
    // }
    return `http://${SERVER.host}:${SERVER.port}/media/default-group-avatar.png`
}