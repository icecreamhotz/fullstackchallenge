import socketIOClient from "socket.io-client";

const endpoint = "http://localhost:8000";

export const socket = socketIOClient(endpoint);
