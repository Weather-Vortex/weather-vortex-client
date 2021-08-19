import { io } from "socket.io-client";

const URL = process.env.VUE_APP_SERVER_URL;

/**
 * Create an instance of a socket to the server.
 * @returns {Socket} Socket.IO client instance.
 */
export default function() {
  const instance = io(URL, { autoConnect: false, forceNew: true });

  if (process.env.NODE_ENV !== "production") {
    // Listen for this event only in debug environment.
    instance.onAny((event, ...args) => {
      console.log("Any event", event, args);
    });
  }
  return instance;
}
