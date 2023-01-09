import React, { useEffect, useState } from "react";
import { useChannel } from "../util/AblyReactEffect";
import { Types } from "ably";

const AblyGame = () => {
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<Types.Message[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const [channel, ably]: any = useChannel("Match", (message: Types.Message) => {
    console.log("Message received: " + message.data);
  });

  const sendMatchData = (message: any) => {
    channel.publish({ name: "Match", data: message });
  };

  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ably.connection.id ? "me" : "other";
    return <span key={index} data-author={author}>{message.data}</span>;
  });

  return (
    <div>      
      <input type={"text"} value={messageText} onChange={(e)=>setMessageText(e.target.value)}/>
      <button
        onClick={() => sendMatchData(messageText)}
        disabled={messageTextIsEmpty}
      >
        Send
      </button>
      <br></br>
    <div>{messages}</div>
    </div>
  );
};

export default AblyGame;
