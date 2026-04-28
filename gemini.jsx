import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Folder, MessageSquare, Send, Settings, 
  PanelLeftClose, PanelLeftOpen, Zap, Brain, Code, 
  Maximize, Minimize, Plus, FileText, Image as ImageIcon,
  MoreHorizontal, Check, Copy
} from 'lucide-react';

// --- Mock Data ---
const MOCK_HISTORY = [
  { id: 1, title: 'React Redesign Architecture', folder: 'Work', active: true },
  { id: 2, title: 'Python Web Scraper', folder: 'Coding', active: false },
  { id: 3, title: 'Q2 Marketing Copy', folder: 'Writing', active: false },
];

const MODELS = [
  { id: 'flash', name: 'Gemini 3.1 Flash', icon: Zap, color: 'text-yellow-400' },
  { id: 'pro', name: 'Gemini 3.1 Pro', icon: Brain, color: 'text-blue-400' },
  { id: 'thinking', name: 'Deep Research (Thinking)', icon: Code, color: 'text-purple-400' },
];

export default function App() {
  // --- State Management ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [selectedModel, setSelectedModel] = useState(MODELS[1]); // Default to Pro
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'I am ready to help you with your React architecture. What components should we build first?',
      model: 'Gemini 3.1 Pro',
      type: 'text'
    }
  ]);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  // --- Handlers ---
  const handleSend = () => {
    if (!input.trim() || isGenerating) return;

    const newUserMsg = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsGenerating(true);

    // Simulate robust generation state
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'I have generated the foundational layout component. I ensured that all state management hooks are properly isolated to prevent unexpected unmounting during renders.\n\n```jsx\nexport function Layout() {\n  return (\n    <div className="flex h-screen bg-gray-900">\n      <Sidebar />\n      <MainCanvas />\n    </div>\n  );\n}\n```\n\nWould you like me to add the drag-to-resize functionality next?',
        model: selectedModel.name,
        type: 'mixed'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // --- Components ---

  const CodeBlock = ({ code }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
      document.execCommand('copy'); // Fallback for iframe environments
      navigator.clipboard?.writeText(code).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="my-4 rounded-lg overflow-hidden border border-[#333333] bg-[#111111]">
        <div className="flex items-center justify-between px-4 py-2 bg-[#1A1A1A] border-b border-[#333333] text-xs text-gray-400">
          <span>jsx</span>
          <button onClick={handleCopy} className="hover:text-gray-200 transition-colors flex items-center gap-1">
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy code'}
          </button>
        </div>
        <div className="p-4 overflow-x-auto text-sm font-mono text-gray-200 leading-relaxed">
          <pre><code>{code}</code></pre>
        </div>
      </div>
    );
  };

  const MessageBubble = ({ msg }) => {
    const isUser = msg.role === 'user';
    
    return (
      <div className={`flex flex-col gap-1 w-full max-w-4xl mx-auto py-6 ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1 ml-1">
            <selectedModel.icon size={14} className={selectedModel.color} />
            <span>{msg.model}</span>
          </div>
        )}
        
        <div className={`
          relative group max-w-[85%] rounded-2xl px-5 py-4 text-[15px] leading-relaxed
          ${isUser 
            ? 'bg-[#1A1A1A] border border-[#2A2A2A] text-gray-100' 
            : 'bg-transparent text-gray-200'
          }
        `}>
          {msg.content.includes('```') ? (
            // Basic markdown code block parser simulation
            <div>
              {msg.content.split('```').map((part, index) => {
                if (index % 2 === 1) {
                  const codeContent = part.replace(/^jsx\n/, ''); // Strip lang identifier for mock
                  return <CodeBlock key={index} code={codeContent.trim()} />;
                }
                return <p key={index} className="whitespace-pre-wrap">{part}</p>;
              })}
            </div>
          ) : (
             <p className="whitespace-pre-wrap">{msg.content}</p>
          )}

          {/* Hover Actions */}
          {!isUser && (
             <div className="absolute -bottom-6 left-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button className="p-1 hover:bg-[#2A2A2A] rounded text-gray-400 hover:text-gray-200"><Copy size={14} /></button>
                <button className="p-1 hover:bg-[#2A2A2A] rounded text-gray-400 hover:text-gray-200"><MoreHorizontal size={14} /></button>
             </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#0D0D0D] text-gray-100 font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* --- Context Sidebar (Collapsible) --- */}
      {(!isFocusMode && isSidebarOpen) && (
        <aside className="w-64 bg-[#0D0D0D] border-r border-[#1F1F1F] flex flex-col flex-shrink-0 transition-all duration-300">
          <div className="p-4 flex items-center justify-between">
            <span className="font-semibold text-lg text-gray-200 tracking-tight">Gemini</span>
            <button className="p-1.5 hover:bg-[#1A1A1A] rounded-md transition-colors">
              <Settings size={18} className="text-gray-400" />
            </button>
          </div>

          <div className="px-3 pb-4">
            <button className="w-full flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#252525] border border-[#2A2A2A] px-3 py-2.5 rounded-lg transition-colors text-sm font-medium">
              <Plus size={16} /> New Project
            </button>
          </div>

          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Active Context
          </div>
          <div className="px-2 space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1A1A1A] text-sm text-gray-300 transition-colors group">
              <FileText size={16} className="text-blue-400 opacity-80" />
              <span className="truncate text-left flex-1">PRD_Document.pdf</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1A1A1A] text-sm text-gray-300 transition-colors group">
              <Code size={16} className="text-yellow-400 opacity-80" />
              <span className="truncate text-left flex-1">App.jsx</span>
            </button>
          </div>

          <div className="px-4 py-4 mt-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Projects
          </div>
          <div className="flex-1 overflow-y-auto px-2 space-y-1 custom-scrollbar">
            {MOCK_HISTORY.map((chat) => (
              <button 
                key={chat.id}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors
                  ${chat.active ? 'bg-[#1A1A1A] text-blue-400 font-medium' : 'hover:bg-[#1A1A1A] text-gray-400 hover:text-gray-200'}
                `}
              >
                {chat.folder === 'Coding' ? <Code size={16}/> : chat.folder === 'Work' ? <Folder size={16}/> : <MessageSquare size={16}/>}
                <span className="truncate text-left">{chat.title}</span>
              </button>
            ))}
          </div>
          
          <div className="p-4 border-t border-[#1F1F1F]">
             <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-[#1A1A1A] cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                <div className="flex flex-col text-sm">
                   <span className="font-medium">Pro Workspace</span>
                   <span className="text-xs text-gray-500">Personal</span>
                </div>
             </div>
          </div>
        </aside>
      )}

      {/* --- Main Workspace Canvas --- */}
      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        
        {/* Top Chrome / Header */}
        <header className="h-14 flex items-center justify-between px-4 border-b border-[#1F1F1F] flex-shrink-0 bg-[#0D0D0D]/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2">
            {!isFocusMode && (
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-[#1A1A1A] rounded-md text-gray-400 transition-colors"
                title="Toggle Sidebar"
              >
                {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
              </button>
            )}
            
            {/* Model Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#1A1A1A] rounded-md border border-transparent hover:border-[#2A2A2A] transition-all text-sm font-medium"
              >
                <selectedModel.icon size={16} className={selectedModel.color} />
                {selectedModel.name}
              </button>
              
              {isModelMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl shadow-2xl overflow-hidden z-50">
                  {MODELS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => { setSelectedModel(m); setIsModelMenuOpen(false); }}
                      className="w-full flex items-start gap-3 px-4 py-3 hover:bg-[#252525] transition-colors text-left"
                    >
                      <m.icon size={18} className={`mt-0.5 ${m.color}`} />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-100">{m.name}</span>
                        <span className="text-xs text-gray-500">
                          {m.id === 'flash' ? 'Fastest for everyday tasks' : m.id === 'pro' ? 'Best for complex reasoning' : 'Deep execution and research'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFocusMode(!isFocusMode)}
              className={`p-2 rounded-md transition-colors text-sm flex items-center gap-2
                ${isFocusMode ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'hover:bg-[#1A1A1A] text-gray-400'}
              `}
              title="Toggle Focus Mode"
            >
              {isFocusMode ? <Minimize size={16} /> : <Maximize size={16} />}
              <span className="hidden sm:inline">{isFocusMode ? 'Exit Focus' : 'Focus'}</span>
            </button>
          </div>
        </header>

        {/* Chat History Canvas */}
        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
          <div className="max-w-4xl mx-auto pt-8 pb-32">
             {messages.map(msg => (
               <MessageBubble key={msg.id} msg={msg} />
             ))}
             
             {isGenerating && (
               <div className="flex items-center gap-3 text-gray-500 max-w-4xl mx-auto py-6">
                 <div className="flex items-center gap-1">
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                 </div>
                 <span className="text-sm">Thinking...</span>
               </div>
             )}
             <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Bottom Input Area */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D] to-transparent pt-8 pb-6 px-4">
          <div className="max-w-3xl mx-auto relative group">
            
            {/* Input Wrapper - High contrast border, strict state management */}
            <div className="bg-[#1A1A1A] border border-[#333333] focus-within:border-[#555555] focus-within:ring-1 focus-within:ring-[#555555] rounded-2xl shadow-xl overflow-hidden transition-all duration-200 flex flex-col">
              
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isGenerating ? "Gemini is responding..." : "Message Gemini..."}
                disabled={isGenerating}
                className="w-full max-h-[40vh] bg-transparent text-gray-100 placeholder-gray-500 px-4 pt-4 pb-2 resize-none outline-none text-[15px] leading-relaxed custom-scrollbar disabled:opacity-50"
                rows={1}
              />
              
              {/* Bottom Action Bar inside input */}
              <div className="flex items-center justify-between px-3 pb-3 pt-1">
                <div className="flex items-center gap-1">
                  <button className="p-2 hover:bg-[#2A2A2A] rounded-lg text-gray-400 transition-colors tooltip-trigger" title="Attach Context">
                    <Plus size={18} />
                  </button>
                  <button className="p-2 hover:bg-[#2A2A2A] rounded-lg text-gray-400 transition-colors" title="Upload Image">
                    <ImageIcon size={18} />
                  </button>
                </div>

                {/* Resilient Submit Button */}
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isGenerating}
                  className={`
                    p-2 rounded-xl flex items-center justify-center transition-all
                    ${input.trim() && !isGenerating 
                      ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-md scale-100' 
                      : 'bg-[#2A2A2A] text-gray-600 scale-95 cursor-not-allowed'}
                  `}
                >
                  <Send size={18} className={input.trim() && !isGenerating ? 'translate-x-0.5 -translate-y-0.5' : ''}/>
                </button>
              </div>
            </div>
            
            <div className="text-center mt-3 text-xs text-gray-600 font-medium tracking-wide">
              Gemini can make mistakes. Check important info.
            </div>
          </div>
        </div>

      </main>

      {/* Basic inline styles for custom scrollbar to keep it single-file */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #2A2A2A;
          border-radius: 10px;
          border: 2px solid #0D0D0D;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #3A3A3A;
        }
      `}} />
    </div>
  );
}