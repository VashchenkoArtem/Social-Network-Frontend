import { NGROK_SERVER_URL, SERVER_URL } from "@shared/constants/server";

export function getAvatar(filename: string | undefined | null){
    // if (filename){
    //     return `${NGROK_SERVER_URL}/media/thumb/${filename}`
    // }
    return `${SERVER_URL}/media/default-group-avatar.png`
}