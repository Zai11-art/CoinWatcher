import React from "react";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import { useRef } from "react";
import { IoEyeOutline, IoSendOutline } from "react-icons/io5";

const configuration = new Configuration({
  organization: "org-M4OlLZBFGT6qNHdaQbV2K2JC",
  apiKey: "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"
});

delete configuration.baseOptions.headers["User-Agent"];
const dummyPic =
  "data:image/png;base64,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";

const openai = new OpenAIApi(configuration);

interface ChatsDataType {
  role: string;
  content: string;
}

const AiChatComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<ChatsDataType[]>([]);
  const [isTyping, setIsTyping] = useState(false);


  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight -
        containerRef.current.clientHeight;
    }
  };

  const handleMessageSend = () => {
    scrollToBottom();
  };

  const chat = async (e: React.FormEvent<HTMLFormElement>, message: string) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    handleMessageSend();

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        max_tokens: 10,
        messages: [
          {
            role: "system",
            content:
              "You are watcher Ai, you are a bot with that assists people and giving knowledge abut how cryptocurrencies work. another note is to strictly ask only crypto related questions. Features of the web application their in, are top traded cryptocurrency prices, news, calculators, applications, Learning section and the Ai bot",
          },
          // @ts-ignore
          ...chats,
        ],
      })
      .then((res) => {
        // @ts-ignore
        msgs.push(res?.data?.choices[0].message);
        setChats(msgs);
        setIsTyping(false);
        handleMessageSend();
        // scrollTo(0, 1e10);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <main className="w-[330px] bg-gray-800 rounded-2xl text-gray-300 h-[500px] flex flex-col justify-between">
      <div className="text-white text-glow text-2xl font-bold text-center py-2 flex flex-row items-center justify-center">
        <IoEyeOutline />
        <h1 className="ml-3">Watcher Bot</h1>
      </div>
      <div>
        <section className="h-[350px] overflow-scroll bg-[black]" >
          {chats && chats.length ? (
            chats.map((chat, index) => (
              <>
                <div
                  key={index}
                  className={` p-5 flex items-center   ${
                    chat.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex mt-1  ${
                      chat.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {Object.keys(chats).length > chats.length && 
                        <div>new chat</div>

                    }
                    <div className="bg-gray-900 rounded-2xl p-5 mx-2">
                      <div className="text-md mb-1">
                        <b>{chat.role.toUpperCase()}</b>
                      </div>
                      <div className="text-sm">{chat.content}</div>
                    </div>
                  </div>
                </div>
              </>
            ))
          ) : (
            <>
              <div className="flex items-center justify-center mt-2">
                <div className="text-center p-2 bg-slate-800 w-64 h-9  rounded-2xl">
                  <h1 className="text-sm text-white font-bold">
                    Start chat here.
                  </h1>
                </div>
              </div>
            </>
          )}
          <div ref={containerRef}></div>
        </section>

        <div className={`my-2 text-center  ${isTyping ? "" : "hide"}`}>
          <p className="text-sm">
            <i>{isTyping ? "Bot is Typing..." : ""}</i>
          </p>
        </div>
      </div>

      <div className="w-full flex">
        <form
          onSubmit={(e) => {
            chat(e, message);
          }}
          className="flex w-full  items-center mb-2"
        >
          <div className="w-[100%] mx-2 ">
            <input
              className="rounded-2xl w-[100%] h-10  text-gray-200 bg-[#062c43]"
              type="text"
              name="message"
              value={message}
              placeholder="Ask anything anon..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="w-[5%] text-xl  ml-2 mr-6 hover:text-blue-600 transition-all ease-in-out"
          >
            <IoSendOutline />
          </button>
        </form>
      </div>
    </main>
  );
};

export default AiChatComponent;
