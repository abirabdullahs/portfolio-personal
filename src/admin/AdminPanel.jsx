import React, { useState, useEffect } from "react";
import { app } from "../firebase";
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(app);

export default function AdminPanel() {
  const [tab, setTab] = useState("messages");
  const [messages, setMessages] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      const querySnapshot = await getDocs(collection(db, "messages"));
      setMessages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchMessages();
  }, []);

  async function handleDeleteMessage(id) {
    await deleteDoc(doc(db, "messages", id));
    setMessages(msgs => msgs.filter(m => m.id !== id));
  }

  async function handleMarkRead(id, read) {
    await updateDoc(doc(db, "messages", id), { read });
    setMessages(msgs =>
      msgs.map(m => (m.id === id ? { ...m, read } : m))
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-10 px-4 font-[Quicksand,Poppins,sans-serif]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700 dark:text-blue-400">
          Admin Panel
        </h2>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {["blog", "courses", "messages"].map(t => (
            <button
              key={t}
              className={`px-5 py-2 rounded-lg shadow transition-all ${
                tab === t
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Messages Tab */}
        {tab === "messages" && (
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Contact Messages
            </h3>
            {messages.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No messages found.</p>
            ) : (
              <ul className="space-y-3">
                {messages.map(m => (
                  <li
                    key={m.id}
                    className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900 shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <strong className="text-gray-900 dark:text-gray-100">{m.name}</strong>{" "}
                        <span className="text-sm text-gray-600 dark:text-gray-400">({m.email})</span>
                        {m.subject && (
                          <span className="ml-2 text-sm text-gray-500">[{m.subject}]</span>
                        )}
                        <div className="text-xs text-gray-400">
                          {m.timestamp?.toDate?.().toLocaleString?.() || ""}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className={`px-2 py-1 rounded text-xs ${
                            m.read
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                          onClick={() => handleMarkRead(m.id, !m.read)}
                        >
                          {m.read ? "Mark Unread" : "Mark Read"}
                        </button>
                        <button
                          className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700"
                          onClick={() =>
                            setExpandedId(expandedId === m.id ? null : m.id)
                          }
                        >
                          {expandedId === m.id ? "Hide" : "View"}
                        </button>
                        <button
                          className="px-2 py-1 rounded text-xs bg-red-100 text-red-700"
                          onClick={() => handleDeleteMessage(m.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {expandedId === m.id && (
                      <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="font-semibold mb-1 text-gray-900 dark:text-gray-100">
                          Message:
                        </div>
                        <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                          {m.message}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Placeholder for Blog & Courses */}
        {tab === "blog" && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            📑 Blog management coming soon...
          </div>
        )}
        {tab === "courses" && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            📘 Courses management coming soon...
          </div>
        )}
      </div>
    </div>
  );
}
