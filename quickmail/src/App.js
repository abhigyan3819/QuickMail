import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API_BASE = "https://api.mail.tm";
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
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

      setIsAuthenticated(true);
      fetchEmails(authData.token)
    } catch (error) {
      console.error("Error authenticating:", error);
    }
  };

  const fetchEmails = async (token) => {
      try {
      let headers = { Authorization: `Bearer ${token}` };
      setInterval(async () => {
        let messagesResponse = await fetch(`${API_BASE}/messages`, { headers });
        let messagesData = await messagesResponse.json();
        let messages = messagesData["hydra:member"];
        console.log(headers)
        if(!messages)return
        setEmails(() => {
          return [
            ...messages.map((msg) => ({
              id: msg.id,
              from: msg.from.address,
              subject: msg.subject,
              intro: msg.intro,
            })),
          ];
        });
        console.log(messages)
      }, 2000);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  createTempEmail();

  return () => {
    clearInterval();
  };
}, []);


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
                            value={email ? email:"Generating..."}
                            readOnly
                            className="w-full bg-gray-800 py-3 px-4 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                        />
                        <span className="absolute left-4 top-0 text-xs text-gray-400 transform -translate-y-1/2 px-1 bg-gray-800">
                            Your Temporary Email
                        </span>
                    </div>
                    <button className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg mr-2 transition-all duration-300 hover:scale-105 group border border-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 group-hover:text-blue-400 transition-colors duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                            />
                        </svg>
                    </button>
                    <button className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-105 group border border-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 group-hover:text-green-400 transition-colors duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex gap-6 flex-1 overflow-hidden">
                <div className="w-2/5">
                    <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Received Emails</h2>
                    <div className="space-y-3 overflow-y-auto h-[calc(100vh-230px)] pr-2 scrollbar-thin">
                        {emails.map((mail, index) => (
                                <div key={index} className="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-blue-500 transform hover:-translate-y-1">
                                    <h3 className="font-medium text-blue-400">From: {mail.from}</h3>
                                    <p className="text-sm text-gray-300 truncate">Subject: {mail.subject}</p>
                                    <p className="text-sm text-gray-300 truncate">{mail.intro}</p>
                                </div>
                            ))}
                    </div>
                </div>

                <div className="w-3/5 bg-gray-800 rounded-lg p-5 border border-gray-700 flex flex-col">
                    <div className="border-b border-gray-700 pb-3 mb-4">
                        <h2 className="text-xl font-semibold text-blue-400">Welcome to QuickMail Service</h2>
                        <div className="flex text-xs text-gray-400 mt-1">
                            <span>
                                From: <span className="text-gray-300">support@quickmail.temp</span>
                            </span>
                            <span className="mx-2">•</span>
                            <span>Today, 11:23 AM</span>
                        </div>
                    </div>

                    <div className="overflow-y-auto h-[calc(100vh-280px)] pr-2 scrollbar-thin">
                        <div className="text-gray-300 leading-relaxed">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

}

export default App;
