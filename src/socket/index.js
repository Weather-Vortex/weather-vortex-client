import { io } from "socket.io-client";

const URL = process.env.VUE_APP_SERVER_URL;
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log("Any event", event, args);
});

export default socket;
