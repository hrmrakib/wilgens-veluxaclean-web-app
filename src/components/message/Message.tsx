"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Bot, MoreVertical, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

// AIzaSyAAqfA0f2nbOjMPPKKGR_qQh2K3Ag3X2w0

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const generateResponse = async (userMessage: string) => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: process.env.NEXT_PUBLIC_GEMINI_API_URL,
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: ` Company Name: VeluxaClean
                  Happiness Is Freshly Cleaning House
                  Awesome site on the top advertising a Courses available business online includes assembling having awesome site on the top advertising a Courses available business having.

                  Satisfaction
                  Guarantee
                  24H
                  Availability
                  Local US
                  Professional
                  Flexible
                  Appointments

                  Services:
                  Residential Cleaning Service

                  Services: Drain pipe leaking, pipe clogged, replace the pipe line.

                  Move-in/Move-out

                  Services: Roof leaks, tile replacement, roof cleaning and maintenance.

                  Carpet Cleaning Service

                  Services: Removing and cleaning mildew, restoration and prevention.

                  Commercial Cleaning Service

                  Services: Repair of washing machines, refrigerators, air conditioners, etc.

                  Additionally, there's a "More service?" section with a call-to-action button:

                  Text: "You can tell us what you need and we can help!"

                  Button: "Contact Now"


              User: ${userMessage}`,
                },
              ],
            },
          ],
        },
      });

      const botResponse = response.data.candidates[0].content.parts[0].text;
      return botResponse;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "I'm sorry, I encountered an error processing your request. Please try again later.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      isUser: true,
    };
    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Get bot response
    const botResponse = await generateResponse(newMessage);

    const botMessage: Message = {
      id: messages.length + 2,
      text: botResponse,
      isUser: false,
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  console.log(messages);

  return (
    <div className='z-[999]'>
      {isOpen && (
        <div className=''>
          <div className='fixed bottom-[120px] z-[999] lg:right-8  w-full max-w-md rounded-lg overflow-hidden shadow-lg bg-[#27484C] border border-[#ffd0b048]'>
            <div className='bg-[#6ECEDA] p-3 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='bg-[#27484C] p-1.5 rounded-full'>
                  <Bot className='h-5 w-5 text-white' />
                </div>
                <p className='font-medium text-black'>
                  VeluxaClean{" "}
                  <span className='text-[#27484C]'>(AI Assistant)</span>
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 rounded-full'
                >
                  <MoreVertical className='h-5 w-5' />
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 rounded-full'
                  onClick={toggleChat}
                >
                  <X className='h-5 w-5' />
                </Button>
              </div>
            </div>

            <div className='h-96 overflow-y-auto p-3 bg-[#27484C]'>
              <div className='flex flex-col gap-3'>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!message.isUser && (
                      <div className='mr-2 bg-[#6ECEDA] p-1.5 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0'>
                        <Bot className='h-5 w-5 text-white' />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-1 rounded-lg ${
                        message.isUser
                          ? "bg-white text-black"
                          : "bg-[#6ECEDA] text-white"
                      }`}
                    >
                      {/* <p className='text-sm'>{message.text}</p>  */}

                      {/* formatted response */}
                      <div
                        className={`max-w-full p-1 rounded-xl leading-relaxed text-sm ${
                          message.isUser
                            ? "bg-white text-black"
                            : "bg-[#6ECEDA] text-white"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: message.text
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/- (.*?)\n/g, "<li>$1</li>")
                            .replace(/\n{2,}/g, "<br/><br/>")
                            .replace(/\n/g, "<br/>"),
                        }}
                      />
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className='flex justify-start'>
                    <div className='mr-2 bg-[#6ECEDA] p-1.5 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0'>
                      <Bot className='h-5 w-5 text-white' />
                    </div>
                    <div className='max-w-[80%] p-3 rounded-lg bg-[#6ECEDA] text-white'>
                      <div className='flex gap-1'>
                        <div className='w-2 h-2 rounded-full bg-white animate-bounce'></div>
                        <div
                          className='w-2 h-2 rounded-full bg-white animate-bounce'
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className='w-2 h-2 rounded-full bg-white animate-bounce'
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* {/ Input area /} */}
            <div className='p-3 border-t border-[#FFD0B0] bg-[#27484C]'>
              <div className='flex items-center gap-2'>
                <input
                  type='text'
                  placeholder='Your message...'
                  className='flex-1 p-3 rounded-full border border-[#6ecdda7c] bg-[#6ECEDA] focus:outline-none focus:ring-2 focus:ring-[#6ECEDA]'
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  className='bg-transparent hover:bg-transparent p-2'
                  disabled={isLoading}
                >
                  <Send className='h-8 w-8 text-[#6ECEDA]' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {/ Chat button /} */}
      <button
        onClick={toggleChat}
        className='fixed z-[999] bottom-0 right-3  text-white p-4 rounded-full transition-colors cursor-pointer'
      >
        <svg
          width='80'
          height='80'
          viewBox='0 0 96 96'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='96' height='96' rx='48' fill='#539BA4' />
          <g clipPath='url(#clip0_1052_572)'>
            <path
              d='M48 24C60.8208 24 72 34.584 72 46.8C72 58.8096 61.0728 68.2608 48 68.2608C45.2039 68.2627 42.4253 67.8204 39.768 66.9504C38.6544 68.0304 38.2728 68.3976 35.9088 70.6776C34.2048 71.964 32.6016 72.4008 31.1688 71.5896C29.724 70.7736 29.2896 69.1848 29.5848 67.092L30.5448 61.5264C26.376 57.6048 24 52.4208 24 46.8C24 34.584 35.1768 24 48 24ZM48 27.36C36.9936 27.36 27.36 36.48 27.36 46.8C27.36 51.708 29.5488 56.2272 33.408 59.592L33.456 59.6328L34.1688 60.252L34.008 61.188L33.6768 63.1176L33.588 63.6312L32.904 67.6104C32.8648 67.8784 32.8408 68.1485 32.832 68.4192V68.6472C32.832 68.6584 32.8304 68.6648 32.8272 68.6664C32.844 68.6424 33.1704 68.5392 33.7296 68.1312L38.9376 63.0768L39.9312 63.4512C42.5124 64.4137 45.2452 64.9055 48 64.9032C59.3184 64.9032 68.64 56.8392 68.64 46.8C68.64 36.4824 59.0064 27.36 48 27.36ZM36.5448 42.7512C37.0283 42.7335 37.5104 42.8135 37.9623 42.9864C38.4142 43.1592 38.8266 43.4214 39.1749 43.7572C39.5232 44.093 39.8003 44.4955 39.9895 44.9408C40.1787 45.3861 40.2762 45.865 40.2762 46.3488C40.2762 46.8326 40.1787 47.3115 39.9895 47.7568C39.8003 48.202 39.5232 48.6046 39.1749 48.9404C38.8266 49.2762 38.4142 49.5384 37.9623 49.7112C37.5104 49.8841 37.0283 49.9641 36.5448 49.9464C35.6134 49.9124 34.7315 49.5184 34.0846 48.8475C33.4377 48.1765 33.0762 47.2808 33.0762 46.3488C33.0762 45.4168 33.4377 44.5211 34.0846 43.8501C34.7315 43.1792 35.6134 42.7852 36.5448 42.7512ZM48.54 42.7512C49.0235 42.7335 49.5056 42.8135 49.9575 42.9864C50.4094 43.1592 50.8218 43.4214 51.1701 43.7572C51.5184 44.093 51.7955 44.4955 51.9847 44.9408C52.1739 45.3861 52.2714 45.865 52.2714 46.3488C52.2714 46.8326 52.1739 47.3115 51.9847 47.7568C51.7955 48.202 51.5184 48.6046 51.1701 48.9404C50.8218 49.2762 50.4094 49.5384 49.9575 49.7112C49.5056 49.8841 49.0235 49.9641 48.54 49.9464C47.6086 49.9124 46.7267 49.5184 46.0798 48.8475C45.4329 48.1765 45.0714 47.2808 45.0714 46.3488C45.0714 45.4168 45.4329 44.5211 46.0798 43.8501C46.7267 43.1792 47.6086 42.7852 48.54 42.7512ZM60.5328 42.7512C61.0163 42.7335 61.4984 42.8135 61.9503 42.9864C62.4022 43.1592 62.8146 43.4214 63.1629 43.7572C63.5112 44.093 63.7883 44.4955 63.9775 44.9408C64.1667 45.3861 64.2642 45.865 64.2642 46.3488C64.2642 46.8326 64.1667 47.3115 63.9775 47.7568C63.7883 48.202 63.5112 48.6046 63.1629 48.9404C62.8146 49.2762 62.4022 49.5384 61.9503 49.7112C61.4984 49.8841 61.0163 49.9641 60.5328 49.9464C59.6014 49.9124 58.7195 49.5184 58.0726 48.8475C57.4257 48.1765 57.0642 47.2808 57.0642 46.3488C57.0642 45.4168 57.4257 44.5211 58.0726 43.8501C58.7195 43.1792 59.6014 42.7852 60.5328 42.7512Z'
              fill='white'
            />
          </g>
          <defs>
            <clipPath id='clip0_1052_572'>
              <rect
                width='48'
                height='48'
                fill='white'
                transform='translate(24 24)'
              />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
}
