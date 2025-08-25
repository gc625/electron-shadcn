"use client"
import React, { useEffect } from "react";
import ToggleTheme from "@/components/ToggleTheme";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import Footer from "@/components/template/Footer";
import InitialIcons from "@/components/template/InitialIcons";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { ONBOARDING_ROUTES, OnboardingRoute } from "@/config/navigation";



import { ChatContainer, ChatMessages, ChatForm } from "@/components/ui/chat"
import { MessageList } from "@/components/ui/message-list"  
import { MessageInput } from "@/components/ui/message-input"
import { PromptSuggestions } from "@/components/ui/prompt-suggestions"

export default function ChatPage() {
  // Mock implementation for testing
  const [messages, setMessages] = React.useState<any[]>([])
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    window.overlayAPI.create();
    
    return () => {
      window.overlayAPI.destroy();
    };
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e?: any) => {
    e?.preventDefault?.()
    if (!input.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input,
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)


    const ai_answer = await window.gemini.submit(userMessage.content)
    const aiMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant" as const,
      content: ai_answer
      // content: `This is a mock response to: "${userMessage.content}". In a real implementation, this would connect to an AI service.`,
    }
    setMessages(prev => [...prev, aiMessage])
    setIsLoading(false)
    // Mock AI response
    // setTimeout(() => {
    //   const aiMessage = {
    //     id: (Date.now() + 1).toString(),
    //     role: "assistant" as const,
    //     content: `This is a mock response to: "${userMessage.content}". In a real implementation, this would connect to an AI service.`,
    //   }
    //   setMessages(prev => [...prev, aiMessage])
    //   setIsLoading(false)
    // }, 100)
  }

  const append = (message: { role: "user"; content: string }) => {
    const newMessage = {
      id: Date.now().toString(),
      ...message,
    }
    setMessages(prev => [...prev, newMessage])
  }



  
  return (
  <div className="flex flex-col h-full">
    <div className="flex-1 min-h-0 overflow-y-auto">
      {messages.length === 0 ? (
        <PromptSuggestions
          label="Try these prompts ✨"
          append={append}
          suggestions={[
            "What is the weather in San Francisco?",
            "Explain step-by-step how to solve this math problem: If x² + 6x + 9 = 25, what is x?",
            "Design a simple algorithm to find the longest palindrome in a string.",
          ]}
        />
      ) : (
        <div className="pb-4">
          <MessageList 
            messages={messages} 
            isTyping={isLoading}
          />
        </div>
      )}
    </div>
      
      <div>
          <ChatForm className="mt-auto"
          isPending={isLoading}
          handleSubmit={handleSubmit}>
          {({ files, setFiles }) => (
            <MessageInput
              value={input}
              onChange={handleInputChange}
              allowAttachments
              files={files}
              setFiles={setFiles}
              stop={() => setIsLoading(false)}
              isGenerating={isLoading}
              className="messagel-input"
            />
          )}

          </ChatForm>
      </div>
      <Footer />
    </div>
  )
}
