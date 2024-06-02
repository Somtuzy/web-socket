import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [currentUser, setCurrentUser] = useState(`user${nanoid(4)}`);

  useEffect(() => {
    socket.on("chat", (payload) => {
      console.log("payload:", payload);

      setChat((prev) => {
        return [...prev, payload];
      });
    });
  }, []);

  const sendChat = (e) => {
    e.preventDefault();

    socket.emit("chat", { message, from: currentUser });

    setMessage("");
  };

  return (
    <div>
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

      <div>
        <h1>Messsages</h1>
        <ul>
          {chat.map((c, i) => (
            <li key={i}>{c.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
