import React, { useState } from "react";
import UsersTable from "../components/UsersTable";
import PostsPopup from "../components/PostsPopup";

const Home = () => {
    const [showUsers, setShowUsers] = useState(false);
    const [showPosts, setShowPosts] = useState(false);

    return (
        <div style={{
            display: "flex",
            flexDirection: "center",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Arial, sans-serif",
            minHeight: "100vh",
            background: "linear-gradient(135deg, #2196F3)", // full page gradient
            color: "white",
            padding: 0, // remove extra padding from body
            margin: 0,
        }}>

            {/* Header */}
            <header
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px 40px",
                    backgroundColor: "#1E3A8A",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    position: "sticky",
                    top: 0,
                    zIndex: 100
                }}
            >
                <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Admin Dashboard</h1>

                <div style={{ display: "flex", gap: "15px" }}>
                    <button
                        onClick={() => setShowUsers(!showUsers)}
                        style={{
                            backgroundColor: "#2196F3",
                            color: "white",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "16px",
                            transition: "0.3s",
                        }}
                        onMouseEnter={e => (e.target.style.backgroundColor = "#1976D2")}
                        onMouseLeave={e => (e.target.style.backgroundColor = "#2196F3")}
                    >
                        {showUsers ? "Hide Users Table" : "Show Users Table"}
                    </button>

                    <button
                        onClick={() => setShowPosts(!showPosts)}
                        style={{
                            backgroundColor: "#2196F3",
                            color: "white",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "16px",
                            transition: "0.3s",
                        }}
                        onMouseEnter={e => (e.target.style.backgroundColor = "#1976D2")}
                        onMouseLeave={e => (e.target.style.backgroundColor = "#2196F3")}
                    >
                        {showPosts ? "Hide All Posts" : "Show All Posts"}
                    </button>
                </div>
            </header>

            {/* Main content */}
            <main style={{ padding: "20px 40px" }}>
                {showUsers && (
                    <div
                        style={{
                            backgroundColor: "white",
                            borderRadius: "12px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            padding: "50px",
                            marginBottom: "30px"
                        }}
                    >
                        <UsersTable />
                    </div>
                )}

                {showPosts && (
                    <div
                        style={{
                            backgroundColor: "white",
                            borderRadius: "12px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            padding: "50px",
                        }}
                    >
                        <PostsPopup />
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
