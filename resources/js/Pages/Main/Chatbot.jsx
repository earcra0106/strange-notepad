import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

    const sendPrompt = async () => {
        try {
            const res = await axios.post("/api/ai/generate", { prompt });
            setResponse(res.data.result);
        } catch (e) {
            setResponse("エラーが発生しました。");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto space-y-4">
            <textarea
                className="w-full p-2 border rounded"
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="何か話しかけてみて..."
            />
            <button
                onClick={sendPrompt}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                送信
            </button>
            {response && (
                <div className="p-4 bg-gray-100 rounded">
                    <strong>AIの返答:</strong>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
