// Message.js
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useGetAllUserWithSearchQuery } from "../../redux/features/Admin Management/getAllUser";
import {
  useCreateMessageMutation,
  useGetMessagesQuery,
  useGetReceiverQuery,
} from "../../redux/features/Student Management/messages";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const socket = io("https://universe-hub-backend.onrender.com", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const Message = () => {
  const sender = useSelector(selectCurrentUser);
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const messagesEndRef = useRef(null);

  const { data: messagesData, refetch: refetchMessages } = useGetMessagesQuery(
    receiver ? { sender: sender?.id, receiver: receiver._id } : { skip: true }
  );

  const { data: receiverData } = useGetReceiverQuery({
    sender: sender?.id,
  });

  const { data: AllUser } = useGetAllUserWithSearchQuery(searchKeyWord);
  const [createMessage] = useCreateMessageMutation();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData.data);
    }
  }, [messagesData]);

  const handleReceiveMessage = useCallback((newMessage) => {
    setMessages((prevMessages) => {
      if (!prevMessages.some((msg) => msg._id === newMessage._id)) {
        return [...prevMessages, newMessage];
      }
      return prevMessages;
    });
  }, []);

  useEffect(() => {
    socket.on("connect", () => setSocketConnected(true));
    socket.on("disconnect", () => setSocketConnected(false));
    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [handleReceiveMessage]);

  useEffect(() => {
    if (sender?.id && socketConnected) {
      socket.emit("joinRoom", sender.id);
    }
  }, [sender?.id, socketConnected]);

  const onSubmit = async (data) => {
    if (receiver) {
      const message = {
        sender: sender?.id,
        receiver: receiver._id,
        content: data.message,
      };
      try {
        const result = await createMessage(message).unwrap();
        socket.emit("sendMessage", {
          sender: sender?.id,
          receiver: receiver._id,
          content: data.message,
        });
        setMessages((prevMessages) => [...prevMessages, result.data]);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
      reset();
    }
  };

  useEffect(() => {
    if (receiver) {
      refetchMessages();
    }
  }, [receiver, refetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen antialiased text-gray-800 bg-white -mx-7 -my-9">
      <div className="flex flex-row h-full w-full overflow-hidden">
        {/* Sidebar */}
        <div className="flex flex-col py-10 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          {/* Search User Name */}
          <div className="relative">
            <label
              htmlFor="name"
              className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
              Search User Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Jane Smith"
              value={searchKeyWord}
              onChange={(e) => setSearchKeyWord(e.target.value)}
            />
          </div>

          {/* Dropdown Menu for Search Results */}
          <Menu as="div" className="relative mt-2">
            <Transition
              show={
                searchKeyWord &&
                AllUser &&
                AllUser.data &&
                AllUser.data.length > 0
              }
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items
                static
                className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {AllUser?.data?.map((user) => (
                  <Menu.Item key={user._id}>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          setReceiver(user);
                          setSearchKeyWord(""); // Clear search input
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }`}>
                        {user.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Profile Card */}
          <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div className="h-20 w-20 rounded-full border overflow-hidden">
              <img
                src={sender?.imageLink}
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            <div className="text-sm font-semibold mt-2">{sender?.name}</div>
            <div className="text-xs text-gray-500">{sender?.role}</div>
          </div>

          {/* Active Conversations */}
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Active Conversations</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                {receiverData?.data ? receiverData.data.length : 0}
              </span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
              {receiverData?.data?.map((receiverDetail) => (
                <button
                  key={receiverDetail._id}
                  onClick={() => setReceiver(receiverDetail)}
                  className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    {receiverDetail.name.charAt(0)}
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    {receiverDetail.name}
                  </div>
                </button>
              )) || <div>No active conversations</div>}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col flex-auto h-full p-6">
          {receiver ? (
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              {/* Topper Bar */}
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                  {receiver.name.charAt(0)}
                </div>
                <div className="ml-2 text-sm font-semibold">
                  {receiver.name}
                </div>
                <div className="flex items-center justify-center ml-auto">
                  <button className="flex items-center justify-center rounded-full h-10 w-10 bg-gray-200 text-gray-500 hover:bg-gray-300">
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="h-full overflow-hidden py-4">
                <div className="flex flex-col h-full overflow-y-auto">
                  <div className="  gap-y-2">
                    {messages.map((msg) => (
                      <div
                        key={msg._id}
                        className={`col-start-${
                          msg.sender === sender.id ? "7" : "1"
                        } col-end-${
                          msg.sender === sender.id ? "13" : "7"
                        } p-3 rounded-lg`}>
                        <div
                          className={`flex flex-row items-center ${
                            msg.sender === sender.id
                              ? "justify-start flex-row-reverse"
                              : ""
                          }`}>
                          <div
                            className={`flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0`}>
                            {msg.sender === sender.id
                              ? sender.name.charAt(0)
                              : receiver.name.charAt(0)}
                          </div>
                          <div
                            className={`relative ml-3 text-sm ${
                              msg.sender === sender.id
                                ? "bg-indigo-100"
                                : "bg-white"
                            } py-2 px-4 shadow rounded-xl`}>
                            <div>{msg.content}</div>
                          </div>
                          <span className=" text-xs  ms-2 mr-2 text-gray-500">
                            {formatTimestamp(msg.timestamp)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div ref={messagesEndRef} />{" "}
                  {/* This is important for scrolling */}
                </div>
              </div>

              {/* Message Input Area */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-4 flex items-center">
                <input
                  type="text"
                  {...register("message", { required: true })}
                  className="flex-1 rounded-full py-2 px-4 border border-gray-300"
                  placeholder="Type a message..."
                />
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-full">
                  Send
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a user to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
