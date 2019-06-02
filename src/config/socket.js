import socketIOClient from "socket.io-client";

const endpoint = "https://fullstackfulltime.herokuapp.com";

export const socket = socketIOClient(endpoint);
