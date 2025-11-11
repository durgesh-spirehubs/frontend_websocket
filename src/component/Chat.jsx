import { useState, useEffect } from "react";
import { fetchRoom, history } from "../api/api";
export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [userId, setUserId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token missing in localStorage");
      return;
    }
    const ws = new WebSocket(`ws://localhost:3000?token=${token}`);
    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message from server:", data);
      switch (data.type) {
        case "joined":
          console.log(`Joined room: ${data.roomId}`);
          break;
        case "message":
          setMessages((prev) => [...prev, data.sendMessage]);
          break;
        case "seen":
          console.log("Message seen by:", data.seenby);
          break;
        case "delete":
          setMessages((prev) => prev.filter((m) => m.id !== data.messageId));
          break;
        case "count":
          setUnreadCounts(data.data);
          console.log("count", data.data);
          break;
        default:
          console.log("Unhandled:", data);
      }
    };
    ws.onclose = () => console.log("Disconnected from server");
    setSocket(ws);
    return () => ws.close();
  }, []);
  useEffect(() => {
    const getRooms = async () => {
      try {
        const id = localStorage.getItem("user_id");
        setUserId(id);
        const response = await fetchRoom(id);
        setRooms(response.data.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    getRooms();
  }, []);
  const handleJoin = async (roomId) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.warn("Socket not ready yet");
      return;
    }
    const joinData = {
      type: "join",
      roomId,
    };
    const count = {
      type: "count",
      roomId: roomId,
    };
    const seen = {
      type: "seen",
      roomId: roomId,
      seen: true,
    };
    socket.send(JSON.stringify(joinData));
    setActiveRoom(roomId);
    setRoomId(roomId);
    socket.send(JSON.stringify(count));
    socket.send(JSON.stringify(seen));
    const response = await history(roomId);
    setMessages(response.data.data);
  };
  const sendMessage = () => {
    if (!activeRoom) {
      alert("Please join a room first");
      return;
    }
    const msg = {
      type: "message",
      roomId: activeRoom,
      text: inputText,
    };
    const count = {
      type: "count",
      roomId: roomId,
    };
    socket.send(JSON.stringify(msg));
    socket.send(JSON.stringify(count));
    setInputText("");
  };
  const handledelete = (id) => {
    const del = {
      type: "delete",
      roomId: roomId,
      messageId: id,
    };
    socket.send(JSON.stringify(del));
  };
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">All Chat Rooms</h2>
        {rooms.length > 0 ? (
          <ul>
            {rooms.map((room) => {
              const id = room.roomDetail.id;
              const unread = unreadCounts.find((c) => Number(c.roomId) === id);
              const unreadCount = unread ? unread.count : 0;
              return (
                <li
                  key={room.roomDetail.id}
                  onClick={() => handleJoin(room.roomDetail.id)}
                  className={`p-2 mb-2 rounded-md shadow cursor-pointer ${
                    activeRoom === room.roomDetail.id
                      ? "bg-blue-300"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {room.roomDetail.RoomName}
                  {unreadCount >= 0 && (
                    <span className="bg-red-500 text-white  px-2 py-1 m-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No rooms found.</p>
        )}
      </div>
      <div className="flex-1 flex flex-col bg-white p-6">
        <h2 className="text-2xl font-bold mb-4">
          {activeRoom ? `Room ID: ${activeRoom}` : "Select a room"}
        </h2>
        <div className="flex-1 overflow-y-auto border p-4 rounded-md mb-4">
          {messages.length > 0 ? (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 flex ${
                  msg.authorId == userId ? "justify-end" : "justify-start"
                }`}
              >
                  <div
                  className={`p-2 rounded-lg max-w-xs ${
                    msg.authorId == userId
                      ? "bg-green-400 text-white text-right"
                      : "bg-gray-400 text-black text-left"
                  }`}
                >
                  <strong className="block">
                    <p>
                      <button
                        onClick={() => handledelete(msg.id)}
                        className="text-red-500 cursor-pointer"
                      >
                        X
                      </button>
                    </p>
                    {msg.name ||
                      (msg.authorId == userId
                        ? msg.authorDetail.name
                        : msg.authorDetail.name)}
                  </strong>
                  <span>{msg.text}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No messages yet...</p>
          )}
        </div>
        {activeRoom && (
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="border p-2 flex-1 rounded-md"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
