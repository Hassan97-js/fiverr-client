import { type MouseEvent, useRef, useEffect } from "react";
import { Form, useNavigation } from "react-router-dom";

import Button from "../button";

import { capitalize } from "../../utils";

type TProps = {
  receiverName?: string;
};

const ChatInput = ({ receiverName }: TProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();

  const isBusy = navigation.state === "submitting";

  useEffect(() => {
    if (!isBusy) {
      formRef.current?.reset();
    }
  }, [isBusy]);

  const handleSendMessage = (e: MouseEvent<HTMLButtonElement>) => {
    if (textareaRef.current?.value.length === 0) {
      e.preventDefault();
    }
  };

  return (
    <Form ref={formRef} method="POST">
      <label htmlFor="chat" className="sr-only">
        Message {receiverName}
      </label>

      <div className="flex flex-col items-start sm:flex-row lg:items-center gap-4 py-6 rounded-br-lg rounded-bl-lg">
        <textarea
          ref={textareaRef}
          id="chat"
          name="text"
          rows={3}
          className="block p-2.5 w-full text-base bg-white rounded-lg border-[1.8px] border-zinc-300 focus:ring-green-500 focus:border-green-500 outline-none transition"
          placeholder={`Message ${capitalize(receiverName || "")}`}
          autoFocus></textarea>

        <Button onClick={handleSendMessage} variant="primary" type="submit" className="rounded-full">
          <svg
            aria-hidden="true"
            className="w-6 h-6 rotate-90"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </Form>
  );
};

export default ChatInput;
