/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

import type React from "react";
import { useState, useEffect, useRef, Suspense } from "react";
import { Search, Edit3, ArrowUp, Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  useCreateChatMutation,
  useCreateRoomMutation,
} from "@/redux/features/chat/chatAPI";
import { useRouter, useSearchParams } from "next/navigation";

interface ChatItem {
  id: string;
  name: string;
  lastMessage?: string;
  timestamp: Date;
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

function VeluxaCleanChat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [createRoom] = useCreateRoomMutation();
  const [createChat] = useCreateChatMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [roomId, setRoomId] = useState<string | null>(
    searchParams.get("roomId")
  );

  useEffect(() => {
    const query = new URLSearchParams(searchParams);
    if (roomId) {
      query.set("roomId", roomId || "");
      router.push(`?${query.toString()}`);
    }
  }, [roomId]);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock chat history data
  const todayChats: ChatItem[] = [
    { id: "1", name: "Cleaning Service Inquiry", timestamp: new Date() },
    { id: "2", name: "Pricing Questions", timestamp: new Date() },
    { id: "3", name: "Booking Appointment", timestamp: new Date() },
    { id: "4", name: "Service Areas", timestamp: new Date() },
    { id: "5", name: "Deep Cleaning Info", timestamp: new Date() },
    { id: "6", name: "Weekly Schedule", timestamp: new Date() },
  ];

  const yesterdayChats: ChatItem[] = [
    {
      id: "7",
      name: "Move-in Cleaning",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "8",
      name: "Office Cleaning",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "9",
      name: "Carpet Cleaning",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "10",
      name: "Window Cleaning",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "11",
      name: "Post-Construction",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "12",
      name: "Emergency Cleaning",
      timestamp: new Date(Date.now() - 86400000),
    },
  ];

  const previousChats: ChatItem[] = [
    {
      id: "13",
      name: "Holiday Cleaning",
      timestamp: new Date(Date.now() - 172800000),
    },
    {
      id: "14",
      name: "Eco-Friendly Options",
      timestamp: new Date(Date.now() - 172800000),
    },
    {
      id: "15",
      name: "Insurance Questions",
      timestamp: new Date(Date.now() - 172800000),
    },
    {
      id: "16",
      name: "Cancellation Policy",
      timestamp: new Date(Date.now() - 172800000),
    },
  ];

  // const handleSendMessage = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!inputValue.trim()) return;

  //   try {
  //     if (!roomId) {
  //       const res = await createRoom({
  //         question: inputValue,
  //         createRoom: true,
  //       });

  //       console.log(res);

  //       if (res?.data?.success) {
  //         setRoomId(res?.data?.data.roomId);
  //       }
  //     }

  //     const res = await createChat({
  //       question: inputValue,
  //       roomId: roomId || "",
  //     });

  //     if (res?.data?.success) {
  //       const botReply: Message = {
  //         id: Date.now().toString() + "-bot",
  //         content: res?.data?.data.answer,
  //         isUser: false,
  //         timestamp: new Date(),
  //       };
  //       setMessages((prev) => [...prev, botReply]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setInputValue("");
  //     setIsTyping(false);
  //   }
  // };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      let currentRoomId = roomId;

      // 1. Create new room if needed
      if (!currentRoomId) {
        const res = await createRoom({
          question: inputValue,
          createRoom: true,
        });

        if (res?.data?.success) {
          currentRoomId = res.data.data.roomId;
          setRoomId(currentRoomId);
        } else {
          throw new Error("Failed to create room");
        }
      }

      const chatRes = await createChat({
        question: inputValue,
        roomId: currentRoomId,
      });

      const answer = chatRes?.data?.data?.answer;

      if (answer) {
        const botMessage: Message = {
          id: Date.now().toString() + "-bot",
          content: answer,
          isUser: false,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (err) {
      console.error("Message sending error:", err);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewChat = async () => {
    setMessages([]);
    setCurrentChatId(null);
    setIsSearchModalOpen(false);
    setIsSidebarOpen(false);
    inputRef.current?.focus();
  };

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    // Load sample conversation for demo
    const sampleMessages: Message[] = [
      {
        id: "sample1",
        content: "What is a cleaning service and why do I need one?",
        isUser: true,
        timestamp: new Date(Date.now() - 300000),
      },
      {
        id: "sample2",
        content:
          "A professional cleaning service like VeluxaClean provides thorough, reliable cleaning for your home or office. Here's why you might need one:\n\n• Save time for things that matter most to you\n• Professional-grade equipment and eco-friendly products\n• Consistent, high-quality results every time\n• Trained and insured cleaning professionals\n• Customizable cleaning plans to fit your needs\n• Health benefits from a thoroughly clean environment\n\nWe offer flexible scheduling and can handle everything from regular maintenance cleaning to deep cleaning projects. What type of cleaning service interests you most?",
        isUser: false,
        timestamp: new Date(Date.now() - 240000),
      },
    ];
    setMessages(sampleMessages);
    setIsSearchModalOpen(false);
    setIsSidebarOpen(false);
  };

  const ChatHistorySection = ({
    title,
    chats,
  }: {
    title: string;
    chats: ChatItem[];
  }) => (
    <div className='mb-6'>
      <h3 className='text-white/70 text-sm font-medium mb-3 px-1'>{title}</h3>
      <div className='space-y-1'>
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => selectChat(chat.id)}
            className={`w-full text-left px-3 py-2.5 text-white/80 hover:bg-white/10 rounded-lg transition-all duration-200 text-sm group ${
              currentChatId === chat.id ? "bg-white/10" : ""
            }`}
          >
            <div className='truncate'>{chat.name}</div>
          </button>
        ))}
      </div>
    </div>
  );

  // console.log(roomId);

  const SearchModal = () => (
    <div className='fixed inset-0 bg-[#1c202041] z-50 flex items-start justify-center p-4 pt-16 md:pt-20'>
      <div className='relative bg-[#315D62] rounded-2xl w-full max-w-2xl mx-auto shadow-2xl'>
        <div className='p-6'>
          {/* Search Input */}
          <div className='relative mb-6'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600 h-5 w-5' />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search chat'
              className='w-full pl-10 py-3 bg-[#62C1BF] text-slate-800 placeholder:text-slate-600 focus:ring-2 focus:ring-teal-300 focus:border-transparent rounded-xl font-medium'
              autoFocus
            />
          </div>

          {/* New Chat Button */}
          <Button
            onClick={startNewChat}
            className='w-full mb-6 bg-[#62C1BF] hover:bg-[#62C1BF] text-slate-800 rounded-xl py-3 flex items-center justify-center gap-2 font-medium transition-colors'
          >
            <Edit3 className='h-4 w-4' />
            New Chat
          </Button>

          {/* Today Section */}
          <div className='max-h-64 overflow-y-auto'>
            <h3 className='text-white text-sm font-medium mb-3'>Today</h3>
            <div className='space-y-2'>
              {todayChats
                .filter((chat) =>
                  chat.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => selectChat(chat.id)}
                    className='w-full text-left px-3 py-2.5 text-white/80 hover:bg-white/10 rounded-lg transition-colors text-sm flex items-center gap-3'
                  >
                    <MessageCircle className='h-4 w-4 flex-shrink-0' />
                    <span className='truncate'>{chat.name}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsSearchModalOpen(false)}
          className='absolute -top-4 -right-2 bg-red-600 text-white hover:text-white rounded-full p-1 transition-colors'
        >
          <X className='h-5 w-5' />
        </button>
      </div>
    </div>
  );

  return (
    <div className='flex h-screen bg-gray-50 overflow-hidden'>
      {/* Mobile Menu Button */}
      <Button
        variant='ghost'
        size='icon'
        className='fixed top-4 left-4 z-50 lg:hidden bg-slate-600 text-white hover:bg-slate-700 shadow-lg'
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className='h-5 w-5' />
        ) : (
          <Menu className='h-5 w-5' />
        )}
      </Button>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-80 bg-[#27484C] transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:block lg:flex-shrink-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className='flex flex-col h-full'>
          {/* Header */}
          <div className='p-6 border-b border-white/10 flex-shrink-0'>
            <Link href='/'>
              <h1 className='text-white text-xl text-center py-2 font-bold tracking-wide'>
                VELUXACLEAN
              </h1>
            </Link>
            <div className='flex items-center justify-between gap-3 mt-4'>
              <Button
                variant='ghost'
                size='icon'
                className='text-white/70 hover:text-white hover:bg-white/10 transition-colors'
                onClick={() => setIsSearchModalOpen(true)}
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
                    stroke='#F5FDFF'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M22 22L20 20'
                    stroke='#F5FDFF'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='text-white/70 hover:text-white hover:bg-white/10 transition-colors'
                onClick={startNewChat}
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13'
                    stroke='#F5FDFF'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M16.0399 3.02123L8.15988 10.9012C7.85988 11.2012 7.55988 11.7912 7.49988 12.2212L7.06988 15.2312C6.90988 16.3212 7.67988 17.0812 8.76988 16.9312L11.7799 16.5012C12.1999 16.4412 12.7899 16.1412 13.0999 15.8412L20.9799 7.96123C22.3399 6.60123 22.9799 5.02123 20.9799 3.02123C18.9799 1.02123 17.3999 1.66123 16.0399 3.02123Z'
                    stroke='#F5FDFF'
                    strokeWidth='1.5'
                    stroke-miterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M14.9102 4.14844C15.5802 6.53844 17.4502 8.40844 19.8502 9.08844'
                    stroke='#F5FDFF'
                    strokeWidth='1.5'
                    stroke-miterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Button>
            </div>
          </div>

          {/* Chat History */}
          <div className='flex-1 overflow-hidden'>
            <div
              className='h-full overflow-y-auto px-6 py-4'
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255, 255, 255, 0.3) transparent",
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  width: 6px;
                }
                div::-webkit-scrollbar-track {
                  background: transparent;
                }
                div::-webkit-scrollbar-thumb {
                  background: rgba(255, 255, 255, 0.3);
                  border-radius: 3px;
                }
                div::-webkit-scrollbar-thumb:hover {
                  background: rgba(255, 255, 255, 0.5);
                }
              `}</style>
              <ChatHistorySection title='Today' chats={todayChats} />
              <ChatHistorySection title='Yesterday' chats={yesterdayChats} />
              <ChatHistorySection
                title='Previous 7 days'
                chats={previousChats}
              />
            </div>
          </div>

          {/* User Profile */}
          <div className='p-6 border-t border-white/10 flex-shrink-0'>
            <div className='flex items-center gap-3 bg-white rounded-lg p-3'>
              <Avatar className='h-10 w-10'>
                <AvatarImage src='/testi.png' alt='Marvin McKinney' />
                <AvatarFallback className='bg-slate-500 text-[#4A4A4A]'>
                  MM
                </AvatarFallback>
              </Avatar>
              <span className='text-[#4A4A4A] font-medium'>
                Marvin McKinney
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-30 lg:hidden'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className='flex-1 flex flex-col min-w-0'>
        {/* Chat Messages Area */}
        <div className='flex-1 flex flex-col overflow-hidden'>
          {messages.length === 0 ? (
            <div className='flex-1 flex items-center justify-center p-4 lg:p-8'>
              <div className='text-center max-w-2xl mx-auto'>
                <h2 className='text-gray-600 text-lg lg:text-xl font-medium leading-relaxed'>
                  Ask me anything about your Cleaning Service, VeluxaClean
                  terms, or how work VeluxaClean
                </h2>
              </div>
            </div>
          ) : (
            <ScrollArea className='flex-1 px-4 lg:px-8 overflow-auto'>
              <div className='max-w-4xl mx-auto py-4'>
                <div className='space-y-6'>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div className='flex items-start gap-3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl'>
                        {!message.isUser && (
                          <div className='flex-shrink-0 w-12 h-12 bg-[#62C1BF] rounded-full flex items-center justify-center mt-1'>
                            <svg
                              width='40'
                              height='40'
                              viewBox='0 0 40 40'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <circle cx='20' cy='20' r='20' fill='#62C1BF' />
                              <g clipPath='url(#clip0_201_1353)'>
                                <path
                                  d='M19.5554 8.88672C19.5898 10.3162 19.3303 11.7382 18.7919 13.0712C18.2535 14.4042 17.4468 15.6221 16.4179 16.6552C15.389 17.6883 14.1582 18.5163 12.7958 19.0917C11.4335 19.6671 9.96636 19.9787 8.47852 20.0087'
                                  stroke='#224443'
                                  strokeWidth='2'
                                  stroke-miterlimit='10'
                                  strokeLinecap='round'
                                />
                                <path
                                  d='M19.5557 8.88672C19.5214 10.3162 19.7809 11.7382 20.3193 13.0712C20.8576 14.4042 21.6644 15.6221 22.6933 16.6552C23.7222 17.6883 24.953 18.5163 26.3154 19.0917C27.6777 19.6671 29.1448 19.9787 30.6327 20.0087'
                                  stroke='#224443'
                                  strokeWidth='2'
                                  stroke-miterlimit='10'
                                  strokeLinecap='round'
                                />
                                <path
                                  d='M19.5554 31.1297C19.5898 29.7002 19.3303 28.2783 18.7919 26.9453C18.2535 25.6122 17.4468 24.3943 16.4179 23.3613C15.389 22.3282 14.1582 21.5002 12.7958 20.9248C11.4335 20.3493 9.96636 20.0378 8.47852 20.0078'
                                  stroke='#224443'
                                  strokeWidth='2'
                                  stroke-miterlimit='10'
                                  strokeLinecap='round'
                                />
                                <path
                                  d='M19.5557 31.1297C19.5214 29.7002 19.7809 28.2783 20.3193 26.9453C20.8576 25.6122 21.6644 24.3943 22.6933 23.3613C23.7222 22.3282 24.953 21.5002 26.3154 20.9248C27.6777 20.3493 29.1448 20.0378 30.6327 20.0078'
                                  stroke='#224443'
                                  strokeWidth='2'
                                  stroke-miterlimit='10'
                                  strokeLinecap='round'
                                />
                                <ellipse
                                  cx='19.5557'
                                  cy='20'
                                  rx='3'
                                  ry='7'
                                  fill='#224443'
                                />
                                <ellipse
                                  cx='19.5557'
                                  cy='20'
                                  rx='3'
                                  ry='7'
                                  transform='rotate(90 19.5557 20)'
                                  fill='#224443'
                                />
                              </g>
                              <defs>
                                <clipPath id='clip0_201_1353'>
                                  <rect
                                    width='24'
                                    height='24'
                                    fill='white'
                                    transform='translate(7.55566 8)'
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        )}
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.isUser
                              ? "bg-teal-400 text-slate-800 rounded-br-md"
                              : "bg-[#373737] text-white rounded-bl-md"
                          }`}
                        >
                          <p className='text-sm lg:text-base leading-relaxed whitespace-pre-line'>
                            {message?.content}
                          </p>
                        </div>
                        {message.isUser && (
                          <Avatar className='flex-shrink-0 w-8 h-8 mt-1'>
                            <AvatarImage
                              src='/placeholder-user.jpg'
                              alt='User'
                            />
                            <AvatarFallback className='bg-slate-500 text-white text-xs'>
                              MM
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className='flex justify-start'>
                      <div className='flex items-start gap-3'>
                        <div className='flex-shrink-0 w-8 h-8 bg-[#62C1BF] rounded-full flex items-center justify-center mt-1'>
                          <div className='w-4 h-4 bg-slate-600 rounded-full'></div>
                        </div>
                        <div className='bg-slate-700 text-white px-4 py-3 rounded-2xl rounded-bl-md'>
                          <div className='flex space-x-1'>
                            <div className='w-2 h-2 bg-white/60 rounded-full animate-bounce'></div>
                            <div
                              className='w-2 h-2 bg-white/60 rounded-full animate-bounce'
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className='w-2 h-2 bg-white/60 rounded-full animate-bounce'
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Input Area */}
        <div className='flex-shrink-0 p-4 lg:p-8 bg-transparent'>
          <div className='max-w-4xl mx-auto'>
            <form className='relative'>
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Ask me anything about VeluxaClean.....'
                className='w-full h-24 pr-12 py-3 lg:py-4 text-sm lg:text-base bg-[#27484C] text-white placeholder:text-white/60 focus:ring-2 focus:ring-slate-500 focus:border-transparent rounded-xl'
                // disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                // disabled={!inputValue.trim() || isTyping}
                size='icon'
                type='submit'
                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-slate-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-full h-8 w-8 lg:h-10 lg:w-10 transition-colors'
              >
                <ArrowUp className='h-4 w-4 lg:h-5 lg:w-5' />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {isSearchModalOpen && <SearchModal />}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <VeluxaCleanChat />
    </Suspense>
  );
}
