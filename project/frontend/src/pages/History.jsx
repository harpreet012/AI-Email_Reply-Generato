import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import { useSavedReplies } from "../store/useSavedReplies";

const API = import.meta.env.VITE_API_URL || "https://ai-email-reply-generato.onrender.com/api";

export default function History() {
  const { addSaved } = useSavedReplies();

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [tone, setTone] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/history`, {
        params: {
          search,
          tone,
        },
      });

      setHistory(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [search, tone]);

  const deleteHistory = async (id) => {
    try {
      await axios.delete(`${API}/history/${id}`);

      fetchHistory();
    } catch (err) {
      console.error(err);
    }
  };

  const clearHistory = async () => {
    if (!window.confirm("Clear all history?")) return;

    try {
      await axios.delete(`${API}/history`);

      fetchHistory();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar
        title="History"
        subtitle="All replies stored in MongoDB"
      />

      <div className="p-6 space-y-5">

        {/* Search + Filter */}

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search replies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-3"
          />

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="border rounded-lg px-4 py-3"
          >
            <option>All</option>
            <option>Professional</option>
            <option>Formal</option>
            <option>Friendly</option>
            <option>Concise</option>
            <option>Persuasive</option>
          </select>

          <button
            onClick={clearHistory}
            className="bg-red-600 text-white px-5 rounded-lg"
          >
            Clear
          </button>

        </div>

        {loading ? (

          <p>Loading...</p>

        ) : history.length === 0 ? (

          <div className="bg-white border rounded-lg p-8 text-center">
            No replies found.
          </div>

        ) : (

          <div className="space-y-4">

            {history.map((item) => (

              <div
                key={item._id}
                className="bg-white border rounded-lg p-5 shadow-sm"
              >

                <div className="flex justify-between items-center">

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                    {item.tone}
                  </span>

                  <span className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>

                </div>

                {item.subject && (
                  <p className="font-semibold mt-3">
                    Subject: {item.subject}
                  </p>
                )}

                <p className="mt-3 whitespace-pre-wrap">
                  {item.generatedReply}
                </p>

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() => navigator.clipboard.writeText(item.generatedReply)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => addSaved(item)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => deleteHistory(item._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}