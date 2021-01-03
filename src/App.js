import React, { useState, useEffect } from "react";
import { messageService } from "./messagesService";

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscription = messageService.onMessage().subscribe((message) => {
      if (message) {
        setMessages((messages) => [...messages, message]);
      } else {
        setMessages([]);
      }

      return subscription.unsubscribe;
    });
  }, []);

  const click = () => {
    messageService.sendMessage("Ola como vai voce!");
  };

  const clear = () => {
    messageService.clearMessages();
  };

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message.text}</div>
      ))}

      <button onClick={() => click()}>CLICK</button>
      <button onClick={() => clear()}>CLEAR</button>
    </div>
  );
};

export default App;
