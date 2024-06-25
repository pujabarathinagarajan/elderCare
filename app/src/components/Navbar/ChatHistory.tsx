import useChat, { priority, selectChatsHistory } from "../../store/store";
import ChatRef from "./ChatRef";

export default function ChatHistory() {
  const chatsHistory = useChat(selectChatsHistory);

  return (
    <div className="my-4 text-[black] px-2 h-full">
      {Object.keys(chatsHistory).length > 0 &&
        Object.keys(chatsHistory)
          .sort((a, b) => priority.indexOf(a) - priority.indexOf(b))
          .map((month) => {
            return (
              <div key={month}>
                <h3 className=" text-sm my-2 text-[black] pl-2">{month}</h3>
                {chatsHistory[month].map((chatId, i) => (
                  <ChatRef key={chatId.id + i} chat={chatId} />
                ))}
              </div>
            );
          })}
      {Object.keys(chatsHistory).length === 0 && (
        <div className="h-full flex justify-center items-center">
          <p className="text-center text-black">No chats yet</p>
        </div>
      )}
    </div>
  );
}
