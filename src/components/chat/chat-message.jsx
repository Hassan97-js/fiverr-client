import { capitalize } from "../../utils";

const ChatMessage = ({ isSender, senderUsername, text, userImage }) => {
  return (
    <div
      className={`flex gap-4 | max-w-lg | py-3 px-5 mb-6 ${
        isSender
          ? "bg-green-100 | rounded-l-xl rounded-b-xl | self-end"
          : "bg-neutral-200/40 | rounded-r-xl rounded-b-xl | self-start"
      } `}>
      <img
        className="w-7 h-7 object-cover object-center rounded-full"
        src={userImage}
        alt=""
      />

      <div>
        <span className="block font-medium mb-1">{capitalize(senderUsername)}</span>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
