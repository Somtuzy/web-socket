import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

const SecondApp = () => {
  const [message, setMessage] = useState("");
  const sendMessage = (message) => {
    socket.emit("send_message", { message });
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data.message);
      alert(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input type="text" placeholder="Message..." onClick={handleMessage}/>
      <button onClick={() => sendMessage(message)}> Send Message </button>
      <h1>{message}</h1>
    </div>
  );
};

export default SecondApp;
