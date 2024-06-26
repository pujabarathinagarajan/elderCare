import useChat from "../../store/store";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";

export default function Chats() {
  const chats = useChat((state) => state.chats);

  return (
    <div className="md:mt-10 w-full">
      <div className="overflow-y-auto h-[500px] md:max-h-[80vh] px-4">
        {chats.map((chat, index) =>
          chat.role === "assistant" ? (
            <BotMessage index={index} key={chat.id} chat={chat} />
          ) : (
            <UserMessage chat={chat} chatIndex={index} key={chat.id} />
          )
        )}

        <div className="h-48 flex-shrink-0"></div> {/* This might be for spacing or a UI requirement */}
      </div>
    </div>
  );
}
