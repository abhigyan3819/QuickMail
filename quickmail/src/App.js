import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API_BASE = "https://api.mail.tm";
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  const createTempEmail = async () => {
    try {
      let domain = "indigobook.com";
      let newEmail = `tempuser${Date.now()}@${domain}`;
      let password = "TempPass123!";

      let accountResponse = await fetch(`${API_BASE}/accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: newEmail, password: password }),
      });

      if (accountResponse.status !== 201) throw new Error("Failed to create account");

      setEmail(newEmail);
      authenticateUser(newEmail, password);
    } catch (error) {
      console.error("Error creating email:", error);
    }
  };

  const authenticateUser = async (email, password) => {
    try {
      let authResponse = await fetch(`${API_BASE}/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: email, password: password }),
      });

      let authData = await authResponse.json();
      if (!authData.token) throw new Error("Authentication failed");

      setToken(authData.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error authenticating:", error);
    }
  };

  const fetchEmails = async () => {
    if (!isAuthenticated) return;

    try {
      let headers = { Authorization: `Bearer ${token}` };

      setInterval(async () => {
        let messagesResponse = await fetch(`${API_BASE}/messages`, { headers });
        let messagesData = await messagesResponse.json();
        let messages = messagesData["hydra:member"];

        // Append new messages to the list
        setEmails((prevEmails) => {
          return [
            ...prevEmails,
            ...messages.map((msg) => ({
              id: msg.id,
              from: msg.from.address,
              subject: msg.subject,
              intro: msg.intro,
            })),
          ];
        });
      }, 2000);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  createTempEmail();

  return () => {
    // Cleanup interval when the component is unmounted
    clearInterval();
  };
}, [isAuthenticated, token]);


    return (
        <div id="webcrumbs">
            <div className="w-[100vw] h-[100vh] bg-gray-900 text-white p-6 flex flex-col">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        QuickMail
                    </h1>
                </header>

                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <div className="relative flex-1 mr-3">
                            <input
                                type="text"
                                value={email}
                                readOnly
                                className="w-full bg-gray-800 py-3 px-4 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                            />
                            <span className="absolute left-4 top-0 text-xs text-gray-400 transform -translate-y-1/2 px-1 bg-gray-800">
                                Your Temporary Email
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 flex-1 overflow-hidden">
                    <div className="w-2/5">
                        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Received Emails</h2>
                        <div className="space-y-3 overflow-y-auto h-[calc(100vh-230px)] pr-2 scrollbar-thin">
                            {receivedMails.map((mail, index) => (
                                <div key={index} className="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-blue-500 transform hover:-translate-y-1">
                                    <h3 className="font-medium text-blue-400">From: {mail.from}</h3>
                                    <p className="text-sm text-gray-300 truncate">Subject: {mail.subject}</p>
                                    <p className="text-sm text-gray-300 truncate">{mail.intro}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
