import React, { useState } from "react";

function TestingWhatsappAPi() {
    // Apna number yahan fix kar lo (country code ke sath, bina + sign ke)
    const phoneNumber = "923193856368"; // Example: 923001234567

    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (message.trim() === "") {
            alert("Please type a message first!");
            return;
        }

        // WhatsApp API link
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            message
        )}`;
        window.open(url, "_blank");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-100">
            <h1 className="text-xl font-bold">Send WhatsApp Message</h1>

            <textarea
                className="w-80 p-2 border rounded-lg shadow-md"
                rows="4"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button
                onClick={sendMessage}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
            >
                Send Message
            </button>
        </div>
    );
}

export default TestingWhatsappAPi;
