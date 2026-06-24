const host = typeof window !== "undefined" ? window.location.hostname : "127.0.0.1"

export const SERVER = {
    host: host,
    port: "8000",
}

export const SERVER_URL = `http://${SERVER.host}:${SERVER.port}`
export const NGROK_SERVER_URL = `https://yu-unabiding-vampishly.ngrok-free.dev`

export const CLOUDINARY_URL ="https://res.cloudinary.com/depqshccq/image/upload/";