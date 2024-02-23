"use client";
import { useState, useEffect, use } from "react";
import {
  getChatUsers,
  getChatMessages,
  getHandleMessageSend,
} from "@/utils/actions";

const Chat = ({ userID, dict }) => {
  const [chatUsers, setChatUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Handle get chat users
    const handleGetChatUsers = async () => {
      console.log("Fetching chat users..."); // debug
      console.log("User ID:", userID); // debug

      // Get chat users
      const chatUsers = await getChatUsers(userID);
      console.log("Chat users:"); // debug
      console.log(chatUsers); // debug

      // Set chat users
      setChatUsers(chatUsers);
    };

    handleGetChatUsers();
  }, [userID]);

  const userClick = async (matchID) => {
    // Get user click handler
    const handleUserClick = async (matchID) => {
      console.log("Fetching messages..."); // debug

      // Set current chat
      setCurrentChat(matchID);
      console.log("TÄSSÄ:"); // debug
      console.log(userID); // debug
      console.log(currentChat); // debug

      // Get messages
      const messages = await getChatMessages(userID, matchID);

      // Set messages
      if (!messages) {
        setMessages(messages);
        console.log("No messages."); // debug
      } else if (messages.length === 0) {
        setMessages(messages);
        console.log("No messages."); // debug
      }

      setMessages(messages);
    };

    handleUserClick(matchID);
  };

  const messageSend = (formData) => {
    // Handle empty message
    if (newMessage.trim() === "") return;

    // Get message send handler
    const handleMessageSend = async (formData) => {
      console.log("Sending message..."); // debug

      // Send message
      const response = await getHandleMessageSend(formData);
      console.log("Response:"); // debug
      console.log(response); // debug

      // Handle client-side
      if (response === "success") {
        const updatedMessages = [
          ...messages,
          { senderName: "You", text: newMessage },
        ];
        setMessages(updatedMessages);
        setNewMessage("");
      } else {
        console.log("Message send failed."); // debug
      }
    };

    handleMessageSend(formData);
  };

  return (
    <div className="flex">
      <div className="w-1/4 h-screen overflow-y-auto border-r-4 border-tinder-pink bg-tinder-gray text-white">
        <h2 className="text-lg font-bold p-4 border-b-2 border-tinder-pink">
          {dict.chat.matches}
        </h2>
        <ul>
          {chatUsers.map((user) => (
            <li
              key={user.id}
              className="p-4 cursor-pointer hover:bg-tinder-pink hover:text-tinder-gray font-semibold tracking-wide"
              onClick={() => userClick(user.id)}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 h-screen overflow-y-auto">
        {currentChat && (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">
              {chatUsers.find((user) => user.id === currentChat).username}
            </h2>
            <span className="bg-tinder-gray border-b-2 border-tinder-gray block h-0.5 m-2"></span>

            <ul>
              {messages.map((message, index) => (
                <li key={index} className="mb-2">
                  <strong>{message.senderName}:</strong> {message.text}
                </li>
              ))}
            </ul>
            <div>
              <form className="mt-4 flex" action={messageSend}>
                <input
                  type="text"
                  name="message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={dict.chat.typeMessage}
                  className="flex-1 border border-gray-300 p-2 rounded-l focus:outline-none"
                />
                <input type="hidden" name="userID" value={userID} />
                <input type="hidden" name="matchID" value={currentChat} />
                <button
                  type="submit"
                  className="px-4 py-2 bg-tinder-pink text-white rounded-r hover:bg-tinder-gray focus:outline-none"
                >
                  {dict.chat.send}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
