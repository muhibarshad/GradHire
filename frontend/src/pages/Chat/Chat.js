import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Avatar,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  ConversationHeader,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

import { useState, useRef } from "react";

const Chat = () => {
  const [messageInputValue, setMessageInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const conversationList = [
    {
      id: 1,
      name: "John",
      lastSenderName: "John",
      info: "Yes, I can do it for you",
      active: true,
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      status: "available",
    },
    {
      id: 2,
      name: "Alice",
      lastSenderName: "Alice",
      info: "Sure, no problem",
      active: false,
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      status: "away",
    },
    {
      id: 3,
      name: "Bob",
      lastSenderName: "Bob",
      info: "I'm busy right now",
      active: false,
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      status: "offline",
    },
    {
      id: 4,
      name: "Alias",
      lastSenderName: "Bob",
      info: "How are you?",
      active: true,
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      status: "online",
    },
  ];

  const [activeConversation, setActiveConversation] = useState(
    conversationList[0]
  );
  const filteredUsers = conversationList.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const messageListRef = useRef(null);

  const handleSend = () => {
    if (messageInputValue.trim() === "") {
      return;
    }

    const newMessage = {
      message: messageInputValue,
      sentTime: new Date().toLocaleTimeString(),
      sender: "You",
      direction: "outgoing",
      position: "last",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageInputValue("");

    // Scroll to the bottom of the message list
    messageListRef.current.scrollToBottom();
  };

  return (
    <div
      style={{
        height: "80vh",
        padding: "0px 20px",
        position: "relative",
      }}
    >
      <MainContainer
        responsive
        style={{
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          border: "none",
          display: "flex", // Use flex to allow sidebar and chat to be side by side
        }}
      >
        <Sidebar position="left" scrollable={true} style={{ width: "250px" }}>
          <Search
            placeholder="Search..."
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            style={{ width: "100%" }} // Full width for mobile
          />
          <ConversationList style={{ height: "calc(100% - 50px)" }}>
            {filteredUsers.map((conversation) => (
              <Conversation
                key={conversation.id}
                name={conversation.name}
                lastSenderName={conversation.lastSenderName}
                info={conversation.info}
                active={activeConversation.id === conversation.id}
                onClick={() => setActiveConversation(conversation)}
              >
                <Avatar
                  src={conversation.avatar}
                  name={conversation.name}
                  status={conversation.status}
                />
              </Conversation>
            ))}
          </ConversationList>
        </Sidebar>

        <ChatContainer style={{ flex: 1 }}>
          {" "}
          {/* Allow chat container to take remaining space */}
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar
              src={"https://www.w3schools.com/howto/img_avatar.png"}
              name={activeConversation.name}
            />
            <ConversationHeader.Content
              userName={activeConversation.name}
              info={activeConversation.info}
            />
          </ConversationHeader>
          <MessageList ref={messageListRef}>
            {messages.map((message, index) => (
              <Message key={index} model={message}>
                <Avatar
                  src={"https://www.w3schools.com/howto/img_avatar.png"}
                  name={message.sender}
                />
              </Message>
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={handleSend}
            style={{ width: "100%" }} // Full width for mobile
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chat;
