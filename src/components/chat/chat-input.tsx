import { Form } from "react-router-dom";
import Button from "../button";

const ChatInput = () => {
  return (
    <Form method="POST">
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>

      <div className="flex items-center px-4 py-6 rounded-br-lg rounded-bl-lg bg-neutral-50/80">
        <textarea
          id="chat"
          name="text"
          rows="3"
          className="block mx-4 p-2.5 w-full text-base text-neutral-900 bg-white rounded-lg border-[1.8px] border-neutral-300 focus:ring-green-500 focus:border-green-500 outline-none transition"
          placeholder="Your message..."
          autoFocus></textarea>

        <Button
          type="submit"
          className="inline-flex justify-center p-2 text-green-600 rounded-full cursor-pointer hover:bg-green-100 transition">
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
