import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("http://localhost:3000");

function Spin() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [currentUser, setCurrentUser] = useState("spin");

  useEffect(() => {
    socket.on("chat", (payload) => {
        if (payload.to === currentUser) {
          console.log("message to you:", payload);
        }
  
        if (payload.from === currentUser) {
          console.log("message from you:", payload);
        }
  
        setChat((prev) => {
          return [...prev, payload];
        });
      });
  }, [chat])

  const sendChat = (e) => {
    e.preventDefault();

    socket.emit("chat", { message, from: "spin", to: "tuzy" });

    setMessage("");
  };

  return (
    <div className="boys">
      <h1>Spin</h1>
      <form onSubmit={sendChat}>
        <input
          type="text"
          name="chat"
          placeholder="send text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send Message</button>
      </form>

      <div className="messages">
        <div>
          <h1>Messages from You</h1>
          <ul>
            {chat
              .filter((c) => c.from === currentUser)
              .map((c, i) => (
                <li key={i}>{c.message}</li>
              ))}
          </ul>
        </div>

        <div>
          <h1>Messages To You</h1>
          <ul>
            {chat
              .filter((c) => c.to === currentUser)
              .map((c, i) => (
                <li key={i}>{c.message}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Spin;
