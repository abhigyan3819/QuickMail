import React from "react"

import "./App.css"

function App(){
    return (
        <div id="webcrumbs">
            <div className="w-[1000px] bg-gray-900 text-white min-h-[600px] p-6 rounded-lg shadow-xl">
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
                                value="johndoe123@quickmail.temp"
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

                <div className="flex gap-6">
                    <div className="w-2/5">
                        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Received Emails</h2>
                        <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin">
                            <div className="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-blue-500 transform hover:-translate-y-1">
                                <h3 className="font-medium text-blue-400">Welcome to QuickMail Service</h3>
                                <p className="text-sm text-gray-300 truncate">
                                    Thank you for using our temporary email service. This email will expire in 24
                                    hours...
                                </p>
                            </div>
                            <div className="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-blue-500 transform hover:-translate-y-1">
                                <h3 className="font-medium text-blue-400">Your Account Verification</h3>
                                <p className="text-sm text-gray-300 truncate">
                                    Please verify your account by clicking the link below. This step is necessary to...
                                </p>
                            </div>
                            <div className="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-blue-500 transform hover:-translate-y-1">
                                <h3 className="font-medium text-blue-400">QuickMail Premium Features</h3>
                                <p className="text-sm text-gray-300 truncate">
                                    Discover our premium features that allow you to extend email lifetime, create
                                    multiple...
                                </p>
                            </div>
                            <div className="p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-blue-500 transform hover:-translate-y-1">
                                <h3 className="font-medium text-blue-400">Security Notification</h3>
                                <p className="text-sm text-gray-300 truncate">
                                    We've detected a login to your account from a new device. If this was you, no
                                    action...
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-3/5 bg-gray-800 rounded-lg p-5 border border-gray-700">
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
                        <div className="overflow-y-auto max-h-[350px] pr-2 scrollbar-thin">
                            <div className="text-gray-300 leading-relaxed">
                                <p className="mb-4">Hello there,</p>
                                <p className="mb-4">
                                    Thank you for using QuickMail temporary email service. We're excited to provide you
                                    with a secure and convenient way to protect your primary email from spam and
                                    unwanted communications.
                                </p>
                                <p className="mb-4">
                                    Your temporary email{" "}
                                    <span className="text-blue-400">johndoe123@quickmail.temp</span> is now active and
                                    will remain available for the next 24 hours.
                                </p>
                                <p className="mb-4">With QuickMail you can:</p>
                                <ul className="list-disc pl-5 mb-4 space-y-2">
                                    <li>Receive emails anonymously without sharing your personal information</li>
                                    <li>Sign up for services without worrying about future spam</li>
                                    <li>Test email functionality for your own applications</li>
                                    <li>Protect your privacy online</li>
                                </ul>
                                <p className="mb-4">
                                    If you need any assistance, please visit our help center or contact our support
                                    team.
                                </p>
                                <p>
                                    Best regards,
                                    <br />
                                    The QuickMail Team
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default App;
