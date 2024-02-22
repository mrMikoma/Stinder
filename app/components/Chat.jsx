"use client";
import { useState, useEffect } from "react";
import { getHandleMessageSend } from "@/utils/actions";

const Chat = ({ userID, dict }) => {
  const [chatUsers, setChatUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Dummy chat users
    const dummyUsers = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
      { id: 3, name: "Alice Johnson" },
      { id: 4, name: "Bob Brown" },
    ];

    setChatUsers(dummyUsers);
  }, []);

  const handleUserClick = async (userId) => {
    // Dummy messages
    const dummyMessages = [
      { senderName: "John Doe", text: "Hello!" },
      { senderName: "You", text: "Hi John!" },
      { senderName: "John Doe", text: "How are you?" },
    ];

    setMessages(dummyMessages);
    setCurrentChat(userId);
  };

  const handleMessageSend = () => {
    if (newMessage.trim() === "") return;

    const updatedMessages = [
      ...messages,
      { senderName: "You", text: newMessage },
    ];
    setMessages(updatedMessages);
    setNewMessage("");
  };

  return (
    <div className="flex">
      <div className="w-1/4 h-screen overflow-y-auto border-r border-gray-300">
        <h2 className="text-lg font-semibold p-4">{dict.chat.matches}</h2>
        <ul>
          {chatUsers.map((user) => (
            <li
              key={user.id}
              className="p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => handleUserClick(user.id)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 h-screen overflow-y-auto">
        {currentChat && (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">
              {chatUsers.find((user) => user.id === currentChat)?.name}
            </h2>
            <ul>
              {messages.map((message, index) => (
                <li key={index} className="mb-2">
                  <strong>{message.senderName}:</strong> {message.text}
                </li>
              ))}
            </ul>
            <div>
              <form className="mt-4 flex" action={getHandleMessageSend}>
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
                  className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none"
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
