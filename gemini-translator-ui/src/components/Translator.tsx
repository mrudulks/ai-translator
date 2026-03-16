import { useState } from "react";
import axios from "axios";
import { LanguageSelect } from "./LanguageSelect";
import { useEffect } from "react";

export const Translator = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [lang, setLang] = useState({ name: "German", code: "de-DE" });
  const [isTranslating, setIsTranslating] = useState(false);
  const [apiStatus, setApiStatus] = useState("checking...");

  useEffect(() => {
    const checkAPI = async () => {
      try {
        const { data } = await axios.get("/api");
        setApiStatus("✓ Connected");
      } catch (err) {
        setApiStatus("✗ Disconnected");
      }
    };
    checkAPI();
  }, []);

  const handleTranslate = async () => {
    if (!text) return;
    setIsTranslating(true);
    try {
      // Points to your Express server
      const { data } = await axios.post("/api/translate", {
        text,
        targetLang: lang.name,
      });
      setResult(data.translation);
    } catch (err) {
      alert("Check if your Express server is running!");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSpeak = () => {
    const speech = new SpeechSynthesisUtterance(result);
    speech.lang = lang.code;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gemini Voice Translator 🤖</h2>
        <span className="text-sm font-semibold">{apiStatus}</span>
      </div>

      <textarea
        className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Type something to translate..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex items-center gap-4 mt-4">
        <LanguageSelect value={lang.name} onChange={setLang} />

        <button
          onClick={handleTranslate}
          disabled={isTranslating}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
          {isTranslating ? "Translating..." : "Translate"}
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-white border-l-4 border-green-500 rounded-r-lg">
          <p className="text-lg text-gray-800 mb-3">{result}</p>
          <button
            onClick={handleSpeak}
            className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700">
            <span>🔊</span> Listen to Pronunciation
          </button>
        </div>
      )}
    </div>
  );
};
