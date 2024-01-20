import { cn } from "../../utils";

type TProps = {
  isSender: boolean;
  text: string;
  userImage: string;
};

const ChatMessage = ({ isSender, text, userImage }: TProps) => {
  return (
    <div
      className={cn("flex gap-3 mb-4 w-full", {
        "justify-end": isSender
      })}>
      <div className="flex gap-2 w-9 h-9 rounded-full overflow-hidden min-w-9">
        <img className="w-full h-full object-cover object-center " src={userImage} alt="" />
      </div>

      <div className="break-words text-base w-max lg:max-w-[40%] max-w-[90%]">
        <p
          className={cn("px-5 py-3 rounded-lg w-full", {
            "bg-green-200/80": isSender,
            "bg-zinc-200/40": !isSender
          })}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
