import io from "socket.io-client";

let socket;

const ENDPOINT = "https://node-server.remgika.com";

socket = io(ENDPOINT);

export default socket;
