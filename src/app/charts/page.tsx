"use client";
import React, {
  ButtonHTMLAttributes,
  HtmlHTMLAttributes,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {};

interface questionAnswer {
  id: string;
  question: string;
  answer?: string;
}

export default function Charts({}: Props) {
  const [promptValue, setPromptValue] = useState<string>("");
  const [chatThread, setChatThread] = useState<Array<questionAnswer>>([]);
  const [displayedText, setDisplayedText] = useState<{ [key: string]: string }>({});
  const iframeRef = useRef(null);
  const [blobUrl, setBlobUrl] = useState('');

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPromptValue(value);
  };
  const handleDownKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submitQuery();
    }
  };
  const submitQuery = () => {
    const currentId =  uuidv4()
    const newQuestionOjbect: questionAnswer = {
      id: currentId,
      question: promptValue,
      answer: ""
    };
    setChatThread((prevState) => [...prevState, newQuestionOjbect]);
    setPromptValue("");
    fetch("", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        user_query: promptValue,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //filter current question
        if (data.code) {
          try {
            const blob = new Blob([data.code], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
        
            setBlobUrl(url);
          } catch (error) {
            console.error("Error executing chart code:", error);
          }
        }
        setChatThread((prevState) =>
          prevState.map((item) =>
            item.id === currentId
              ? { ...item, answer: data.explanation } // Assuming the API response has a 'response' field
              : item
          )
        );
      });
  };

  useEffect(() => {
    chatThread.forEach((thread) => {
      if (!displayedText[thread.id]) {
        if(!!thread.answer){
          animateText(thread.id, thread?.answer);
        }
      }
    });
  }, [chatThread]);

  const animateText = (id: string, text: string) => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => ({
        ...prev,
        [id]: text.substring(0, i)
      }));
      i++;
      if (i > text.length) {
        clearInterval(interval);
      }
    }, 10);
  };
  console.log(chatThread, "chatThread")
  return (
    <div>
      <div className="flex relative h-screen overflow-y-auto justify-center">
        <div className="p-4 w-9/12">
          {chatThread.map((thread) => (
            <div key={thread.id} className="mb-4">
              <div className="flex justify-end">
                <div className="max-w-3/4 bg-blue-500 text-white p-3 rounded-lg">
                  {thread.question}
                </div>
              </div>
              <div className={`mt-6 border-solid border-2 border-sky-500 rounded p-5 bg-[#e7effe] rounded-2xl ${!blobUrl.length && "hidden"}`}>
              <iframe
                src={blobUrl}
                width="100%"
                height="400px" // Adjust as necessary
                style={{ border: 'none' }}
                title="Dynamic Chart"
                allowFullScreen
                scrolling="yes" // Enable scrolling if necessary
              />
              </div>
              <div className="mt-6 border-solid border-2 border-sky-500 rounded p-5 bg-[#e7effe] rounded-2xl">
                {displayedText[thread.id] || ''}
              </div>  
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-300 flex justify-center">
          <div className="relative w-9/12">
            <input
              type="text"
              className="w-full border-2 border-blue-500 p-2 pr-16 rounded-lg"
              placeholder="Generate chart for any data..."
              onChange={handlePromptChange}
              value={promptValue}
              onKeyDown={handleDownKey}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 
                rounded-2xl p-1 text-white bg-blue-500 px-3 disabled:bg-gray-400 
                disabled:cursor-not-allowed"
              disabled={promptValue.length <= 0}
              onClick={submitQuery}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
