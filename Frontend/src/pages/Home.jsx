import React, { useContext, useEffect, useRef, useState } from 'react';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import aiImg from '../assets/ai-unscreen.gif';
import userImg from '../assets/user.gif';

const Home = () => {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState('');
  const [aiText, setAiText] = useState('');

  const isSpeakingRef = useRef(false);
  const isRecognizingRef = useRef(false);
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;

  const hasGreetedRef = useRef(false);

  // Logout
  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate('/');
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  // Speak function
  const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'hi-IN';

  const voice = synth.getVoices().find(v => v.lang === 'hi-IN');
  if (voice) utterance.voice = voice;

  isSpeakingRef.current = true;

  utterance.onend = () => {
    isSpeakingRef.current = false;
    setUserText('');
    setAiText('');
    startRecognition();
  };

  synth.speak(utterance);
};


  const speaker = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA'; // Arabic - Saudi Arabia

  const synth = window.speechSynthesis;
  const voice = synth.getVoices().find(v => v.lang.startsWith('ar'));
  if (voice) utterance.voice = voice;

  utterance.onend = () => {
    setUserText('');
    setAiText('');
    startRecognition();
  };

  synth.speak(utterance);
};




  // Handle commands
  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    const query = encodeURIComponent(userInput);
    const urlMap = {
      google_search: `https://www.google.com/search?q=${query}`,
      calculator_open: `https://www.google.com/search?q=calculator`,
      instagram_open: `https://www.instagram.com/`,
      facebook_open: `https://www.facebook.com/`,
      linkedin_open: `https://www.linkedin.com/`,
      weather_open: `https://www.google.com/search?q=weather`,
      youtube_open: `https://www.youtube.com/`, // ✅ added
      youtube_search: `https://www.youtube.com/results?search_query=${query}`,
      youtube_play: `https://www.youtube.com/results?search_query=${query}`
    };


    if (urlMap[type]) {
      window.open(urlMap[type], '_blank');
    }
  };

  // Start recognition safely
  const startRecognition = () => {
    if (!isSpeakingRef.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current.start();
        console.log('Recognition started');
      } catch (err) {
        if (err.name !== 'InvalidStateError') console.error('Start error:', err);
      }
    }
  };

  // Stop recognition
  const stopRecognition = () => {
    if (isRecognizingRef.current) {
      recognitionRef.current.stop();
    }
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
      setListening(false);

      // Only restart if still on /home
      if (!isSpeakingRef.current) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (err) {
            if (err.name !== 'InvalidStateError') console.error(err);
          }
        }, 500);
      }
    };

    recognition.onerror = (event) => {
      if (event.error !== 'aborted') {
        console.warn('Recognition error:', event.error);
      }
      isRecognizingRef.current = false;
      setListening(false);
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();

      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        stopRecognition();
        setAiText('');
        setUserText(transcript);

        const data = await getGeminiResponse(transcript);
        handleCommand(data);
        setAiText(data.response);
        setUserText('');
      }
    };

    // ✅ Send greeting once (when assistantName is available)
    if (!hasGreetedRef.current && userData?.assistantName) {
      hasGreetedRef.current = true;

      const greetings = [
        `Hello ${userData.name}, I'm ${userData.assistantName}. How can I help you today?`,
        `Hi ${userData.name}! It's ${userData.assistantName}. What would you like me to do?`,
        `Welcome back ${userData.name}! I'm ready whenever you are.`,
      ];

      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      setAiText(randomGreeting);
      speak(randomGreeting);
    }

    // Start recognition
    try {
      recognition.start();
    } catch (err) {
      console.error(err);
    }

    // ✅ Cleanup
    return () => {
      recognition.onend = null;
      recognition.stop();
      recognitionRef.current = null;
      isRecognizingRef.current = false;
      setListening(false);
    };
  }, [userData?.assistantName]);



  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col justify-center items-center py-10 px-4 relative">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-4 sm:px-8 py-4 bg-black/30 backdrop-blur-sm text-white z-50">
        <h1 className="text-lg sm:text-xl font-bold">Virtual Assistant</h1>
        <nav className="hidden sm:flex gap-6">
          <button
            className="bg-blue-400 px-4 py-2 rounded-lg text-black"
            onClick={() => navigate('/customize')}
          >
            Customize your Assistant
          </button>
          <button
            className="bg-amber-500 px-4 py-2 rounded-lg text-black"
            onClick={handleLogOut}
          >
            LogOut
          </button>
        </nav>
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`absolute top-16 left-0 w-full sm:hidden transition-all duration-300 z-40
          ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}
        `}
      >
        <div className="backdrop-blur-md bg-white/20 border-t border-white/20 p-4 flex flex-col gap-3 shadow-lg rounded-b-lg">
          <button
            className="bg-blue-400 px-4 py-2 rounded-lg text-black text-lg"
            onClick={() => {
              navigate('/customize');
              setMenuOpen(false);
            }}
          >
            Customize your Assistant
          </button>
          <button
            className="bg-amber-500 px-4 py-2 rounded-lg text-black text-lg"
            onClick={() => {
              handleLogOut();
              setMenuOpen(false);
            }}
          >
            LogOut
          </button>
        </div>
      </div>

      {/* Assistant Image */}
      <div className="w-48 h-64 sm:w-[270px] sm:h-[370px] mt-15 sm:mt-12 flex justify-center items-center overflow-hidden rounded-2xl shadow-2xl">
        <img
          src={userData?.assistantImage}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Assistant Name */}
      <h1 className="text-white text-lg sm:text-2xl font-bold p-4 text-center">
        I'm {userData?.assistantName}
      </h1>

      {!aiText && <img src={userImg} alt="" className="w-[200px] -mt-7" />}
      {aiText && <img src={aiImg} alt="" className="w-[200px] -mt-7" />}

      <h1 className="text-white text-lg font-semibold">{userText ? userText : aiText ? aiText : null}</h1>
    </div>
  );
};

export default Home;
