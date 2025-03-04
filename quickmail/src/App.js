import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [email, setEmail] = useState("");
    const [receivedMails, setReceivedMails] = useState([]);
    let password = "quickmail";
    let API_BASE = "https://api.mail.tm";

    useEffect(() => {
        async function getDomain() {
            try {
                let response = await fetch(`${API_BASE}/domains`);
                let data = await response.json();
                if (!data["hydra:member"].length) throw new Error("No domains available");
                return data["hydra:member"][0].domain; // Use the first available domain
            } catch (error) {
                console.error("Error fetching domain:", error);
                return null;
            }
        }

        async function authenticateUser(mail) {
            console.log("Authenticating with:", mail, password);
            try {
                let authResponse = await fetch(`${API_BASE}/token`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ address: mail, password: password }),
                });

                let authData = await authResponse.json();
                console.log("Auth Response:", authData);

                if (!authData.token) throw new Error("Authentication failed");

                setEmail(mail); // ✅ Correctly set email
                fetchEmails(authData.token);
            } catch (error) {
                console.error("Error authenticating:", error);
            }
        }

        async function createEmail() {
            let domain = await getDomain();
            if (!domain) return;

            let generatedMail = `QuickMail${Date.now()}@${domain}`;
            console.log("Generated email:", generatedMail);

            try {
                let accountResponse = await fetch(`${API_BASE}/accounts`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ address: generatedMail, password: password }),
                });

                let responseText = await accountResponse.text();
                console.log("Account Creation Response:", responseText);

                authenticateUser(generatedMail); // ✅ Pass correct email
            } catch (err) {
                console.error("Error creating email:", err);
            }
        }

        async function fetchEmails(authToken) {
            try {
                let headers = { Authorization: `Bearer ${authToken}` };

                setInterval(async () => {
                    let messagesResponse = await fetch(`${API_BASE}/messages`, { headers });
                    let messagesData = await messagesResponse.json();
                    let messages = messagesData["hydra:member"];

                    let fetchedEmails = await Promise.all(
                        messages.map(async (msg) => {
                            let msgDetailsResponse = await fetch(`${API_BASE}/messages/${msg.id}`, { headers });
                            let msgDetails = await msgDetailsResponse.json();
                            return {
                                from: msgDetails.from.address,
                                subject: msgDetails.subject,
                                intro: msgDetails.intro,
                            };
                        })
                    );

                    setReceivedMails(fetchedEmails);
                }, 5000);
            } catch (error) {
                console.error("Error fetching emails:", error);
            }
        }

        createEmail();
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
