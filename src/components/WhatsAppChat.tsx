import { useState, useEffect, useRef } from 'react';
import { Check, CheckCheck } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'system';
  timestamp: string;
  read: boolean;
}

const conversations = [
  {
    title: "Menu Creation",
    messages: [
      { id: 1, text: "I'd like to swap out a starter on the menu", sender: 'user' as const, timestamp: '09:15', read: true },
      { id: 2, text: "Sure! Which starter are you looking to replace?", sender: 'system' as const, timestamp: '09:15', read: true },
      { id: 3, text: "The beetroot salad - not selling well", sender: 'user' as const, timestamp: '09:16', read: true },
      { id: 4, text: "Got it. What style are you thinking? Something seasonal, or do you want me to suggest options based on your current GP and suppliers?", sender: 'system' as const, timestamp: '09:16', read: true },
      { id: 5, text: "Surprise me - just keep it seasonal and around the same price point", sender: 'user' as const, timestamp: '09:17', read: true },
      { id: 6, text: "Perfect. Looking at:\n• Your current suppliers\n• Seasonal ingredients\n• Similar GP target (72%)\n• £8.50 price point\n\nI've got 3 options for you. Give me 2 minutes.", sender: 'system' as const, timestamp: '09:17', read: true },
      { id: 7, text: "Here are your options:\n\n1. Heritage Tomato & Stracciatella (73% GP)\n2. Smoked Mackerel Pâté with Pickles (74% GP)\n3. Crispy Pork Belly & Apple (71% GP)\n\nAll fully costed with your suppliers. Which one works?", sender: 'system' as const, timestamp: '09:19', read: false }
    ]
  },
  {
    title: "GP Alert",
    messages: [
      { id: 1, text: "Morning! Your lamb supplier just increased prices by 8%. This affects 3 dishes on your menu.", sender: 'system' as const, timestamp: '07:32', read: true },
      { id: 2, text: "What's the damage?", sender: 'user' as const, timestamp: '08:45', read: true },
      { id: 3, text: "Your Lamb Rump dropped from 71% to 65% GP. Here are your options:\n\n1. Adjust portion: 180g → 165g (back to 70% GP)\n2. Increase price: £24 → £26 (72% GP)\n3. Switch cut: Use lamb loin instead (69% GP, same portion)\n\nWhat works for you?", sender: 'system' as const, timestamp: '08:46', read: true },
      { id: 4, text: "Option 3 - switch to loin", sender: 'user' as const, timestamp: '08:47', read: true },
      { id: 5, text: "Done. Recipe updated, allergen info unchanged, GP restored to 69%. Your team will see the updated spec next time they open the dish.", sender: 'system' as const, timestamp: '08:47', read: false }
    ]
  },
  {
    title: "Staff Training",
    messages: [
      { id: 1, text: "I've got 2 new starters Monday - need them trained on allergens and our menu", sender: 'user' as const, timestamp: '14:22', read: true },
      { id: 2, text: "No problem. What are their roles?", sender: 'system' as const, timestamp: '14:22', read: true },
      { id: 3, text: "One chef de partie, one front of house", sender: 'user' as const, timestamp: '14:23', read: true },
      { id: 4, text: "Training plans created:\n\n**Chef de Partie:**\n• Food safety level 2 (45 min)\n• Your menu specs (20 min)\n• Allergen awareness (15 min)\n\n**Front of House:**\n• Allergen customer service (20 min)\n• Menu knowledge (25 min)\n• Your service standards (15 min)\n\nI'll send them WhatsApp links Monday morning. You'll get completion alerts.", sender: 'system' as const, timestamp: '14:24', read: true },
      { id: 5, text: "Perfect. Can they do it before shift?", sender: 'user' as const, timestamp: '14:25', read: true },
      { id: 6, text: "Yes - each plan is under 90 minutes total. They can do it on their phones before they start.", sender: 'system' as const, timestamp: '14:25', read: false }
    ]
  }
];

export default function WhatsAppChat() {
  const [activeConversation, setActiveConversation] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<number[]>([]);

  useEffect(() => {
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];

    setDisplayedMessages([]);
    setIsTyping(false);

    const messages = conversations[activeConversation].messages;
    let currentIndex = 0;

    const showNextMessage = () => {
      if (currentIndex >= messages.length) {
        const timer = window.setTimeout(() => {
          setActiveConversation((prev) => (prev + 1) % conversations.length);
        }, 5000);
        timeoutRef.current.push(timer);
        return;
      }

      const currentMessage = messages[currentIndex];

      if (currentMessage.sender === 'system') {
        setIsTyping(true);
        const typingTimer = window.setTimeout(() => {
          setIsTyping(false);
          setDisplayedMessages(prev => [...prev, currentMessage]);
          currentIndex++;
          const nextTimer = window.setTimeout(showNextMessage, 800);
          timeoutRef.current.push(nextTimer);
        }, 1200);
        timeoutRef.current.push(typingTimer);
      } else {
        setDisplayedMessages(prev => [...prev, currentMessage]);
        currentIndex++;
        const timer = window.setTimeout(showNextMessage, 600);
        timeoutRef.current.push(timer);
      }
    };

    const initialTimer = window.setTimeout(showNextMessage, 1000);
    timeoutRef.current.push(initialTimer);

    return () => {
      timeoutRef.current.forEach(clearTimeout);
      timeoutRef.current = [];
    };
  }, [activeConversation]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        {conversations.map((conv, idx) => (
          <button
            key={idx}
            onClick={() => setActiveConversation(idx)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
              activeConversation === idx
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {conv.title}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-emerald-600 text-white p-3 sm:p-4 flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm sm:text-base">
            HS
          </div>
          <div>
            <div className="font-semibold text-sm sm:text-base">HospitalitySupport.uk</div>
            <div className="text-xs text-emerald-100">Your operations team</div>
          </div>
        </div>

        <div className="h-[400px] sm:h-[500px] overflow-y-auto bg-gray-50 p-3 sm:p-4 space-y-3">
          {displayedMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
                  message.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                }`}
              >
                <div className="text-xs sm:text-sm whitespace-pre-line">{message.text}</div>
                <div
                  className={`flex items-center gap-1 justify-end mt-1 text-xs ${
                    message.sender === 'user' ? 'text-emerald-100' : 'text-gray-500'
                  }`}
                >
                  <span>{message.timestamp}</span>
                  {message.sender === 'user' && (
                    message.read ? <CheckCheck size={12} className="sm:w-3.5 sm:h-3.5" /> : <Check size={12} className="sm:w-3.5 sm:h-3.5" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-sm px-3 sm:px-4 py-2 sm:py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
