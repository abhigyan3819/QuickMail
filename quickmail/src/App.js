import React from "react";
import "./App.css";

export const Component = () => {
    return (
        <div id="webcrumbs">
            <div className="container">
                <header className="header">
                    <h1>QuickMail</h1>
                </header>

                <div className="email-section">
                    <div className="email-input-container">
                        <input
                            type="text"
                            value="johndoe123@quickmail.temp"
                            readOnly
                            className="email-input"
                        />
                        <span className="input-label">Your Temporary Email</span>
                    </div>
                    <button className="icon-button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
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
                    <button className="icon-button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
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

                <div className="email-container">
                    <div className="email-list">
                        <h2>Received Emails</h2>
                        <div className="scrollable">
                            <div className="email-item">
                                <h3>Welcome to QuickMail Service</h3>
                                <p>Thank you for using our temporary email service...</p>
                            </div>
                            <div className="email-item">
                                <h3>Your Account Verification</h3>
                                <p>Please verify your account by clicking the link...</p>
                            </div>
                        </div>
                    </div>

                    <div className="email-content">
                        <h2>Welcome to QuickMail Service</h2>
                        <div className="email-metadata">
                            From: <span>support@quickmail.temp</span> • Today, 11:23 AM
                        </div>
                        <div className="email-body scrollable">
                            <p>Hello there,</p>
                            <p>Thank you for using QuickMail temporary email service...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
