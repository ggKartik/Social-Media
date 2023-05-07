import React, { useEffect, useState } from 'react'
import './Chat.css'
import Navbar from '../../Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getChat } from '../../../actions/chatActions';
import Conversation from '../Components/Conversation';
const Chat = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { chat } = useSelector((state) => state.chats);

  const [currentChat, setCurrentChat] = useState(null);




  useEffect(() => { 
    dispatch(getChat(user._id));
  }, [
    dispatch,
    user._id,
  ])

    return (
      <div className="Chat">
        <Navbar />
      {/* Left Side */}
        <div className="Left-side-chat">
          <div className="Chat-container">
            <h2>Chats</h2>
            <div className="Chat-list">
              {/* {chats.map((chat) => (
                <div
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                >
                  <Conversation
                    data={chat}
                    currentUser={user._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))} */}
              {
                chat.map((item) => (
                  <div
                    onClick={() => { 
                      setCurrentChat(chat);
                    }}
                  >
                    <Conversation
                      firstName={item.receiver.firstName}
                      lastName={item.receiver.lastName}
                      avatarUrl={item.receiver.avatarUrl}
                    />
                  </div>
                ))
              }
            </div>
          </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        {/* <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        /> */}
      </div>
    </div>  
  )
}

export default Chat