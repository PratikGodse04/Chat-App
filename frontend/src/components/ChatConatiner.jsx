import React, { useEffect, useRef, useState } from "react";
import { messageStore } from "../store/messageStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import Loading from "./Loading";
import { userAuthStore } from "../store/userAuthStore";
import moment from "moment";
import ImageModal from "./ImageModal";
import bgImage from "../../public/images/background1.jpg"


export default function ChatConatiner() {
  const {
    message,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessage,
    unSubscribeMessages,
  } = messageStore();
  const { authUser, isCheckingAuth } = userAuthStore();
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");

  const messagesEndRef = useRef(null); // ✅ Ref for scroll target

  const handleCount = () => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {

  getMessages(selectedUser._id);
    

    subscribeToMessage();

    return () => unSubscribeMessages();
  }, [selectedUser._id,count, isCheckingAuth]);

  // ✅ Auto-scroll to bottom on message change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [message]);


  if (isMessagesLoading) {
    return (
      <div className="d-flex flex-grow-1 flex-column overflow-auto"   >
        <ChatHeader />
        <Loading />
        <MessageInput />
      </div>
    );
  }
  

  return (
    <div className="d-flex flex-grow-1 flex-column overflow-auto"  >
      <ChatHeader />
      <div
        className="container w-100 h-100 d-flex flex-column"
        style={{ overflowY: "auto", flexGrow: 1 ,backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', height: '100vh'}}
      >
        {message.map((item) => {
          const isOwnMessage = item.senderId === authUser._id;
          const time = moment(item.createdAt).format("HH:mm");

          return (
            <div
              className={`d-flex mb-2 w-100 p-2 ${
                isOwnMessage ? "justify-content-end" : "justify-content-start"
              }`}
              key={item._id}
            >
              <div
                className={`p-2 rounded text-white ${
                  isOwnMessage ? "bg-success" : "bg-secondary"
                }`}
                style={{ maxWidth: "60%", wordBreak: "break-word" }}
              >
                {item.text && item.image ? (
                  <div>
                    <img
                      src={item.image}
                      style={{
                        height: "200px",
                        width: "200px",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setShowModal(true);
                        setUrl(item.image);
                      }}
                    />
                    <p>{item.text}</p>
                  </div>
                ) : item.text ? (
                  <p>{item.text}</p>
                ) : item.image ? (
                  <img
                    src={item.image}
                    style={{
                      height: "100%",
                      width: "200px",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setShowModal(true);
                      setUrl(item.image);
                    }}
                  />
                ) : null}
                <div
                  className="d-flex w-100 justify-content-end"
                  style={{ height: "8px" }}
                >
                  <p style={{ fontSize: "10px" }}>{time}</p>
                </div>
              </div>
            </div>
          );
        })}
        
        <div ref={messagesEndRef} />
        {showModal && (
          <ImageModal imageUrl={url} onClose={() => setShowModal(false)} />
        )}
      </div>

      <MessageInput handleCount={handleCount} />
    </div>
  );
}
  