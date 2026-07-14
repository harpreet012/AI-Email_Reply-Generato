import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Mail,
  Bookmark,
  Sparkles,
  Activity,
  ArrowRight,
  Copy,
  Trash2,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import DashboardCharts from "../components/DashboardCharts";
import QuickActions from "../components/QuickActions";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/dashboard`);
      setStats(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const copyReply = async (reply, id) => {
    try {
      await navigator.clipboard.writeText(reply);
      await axios.patch(`${API}/history/copy/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteReply = async (id) => {
    if (!window.confirm("Delete this reply?")) return;
    try {
      await axios.delete(`${API}/history/${id}`);
      fetchDashboard();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--paper)] flex justify-center items-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Navbar title="Dashboard" subtitle="Overview of your AI email workspace" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* HERO SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 mb-8"
        >
          {/* ... (hero content remains the same) */}
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            <div>
              <p className="text-sm uppercase tracking-[0.12em] text-stone-500">
                Welcome Back 👋
              </p>
              <h1 className="text-4xl font-bold text-stone-900 mt-2">
                AI Email Reply Generator
              </h1>
              <p className="text-stone-500 mt-4 max-w-xl leading-7">
                Generate intelligent email replies, manage previous conversations,
                organize templates and export responses from one beautiful dashboard.
              </p>

              <div className="flex gap-4 mt-8">
                <Link to="/generator" className="primary-btn">
                  New Reply
                </Link>
                <Link to="/history" className="secondary-btn">
                  View History
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="glass-card p-5 rounded-2xl text-center">
                <Mail className="mx-auto text-[#49684d]" size={30} />
                <h2 className="text-4xl font-bold mt-4">{stats?.totalReplies || 0}</h2>
                <p className="text-stone-500 mt-2">Replies</p>
              </div>
              <div className="glass-card p-5 rounded-2xl text-center">
                <Bookmark className="mx-auto text-[#49684d]" size={30} />
                <h2 className="text-4xl font-bold mt-4">{stats?.totalTemplates || 0}</h2>
                <p className="text-stone-500 mt-2">Templates</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* STATS GRID */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          <DashboardCard icon={<Mail />} label="Replies Generated" value={stats?.totalReplies || 0} hint="Stored in MongoDB" />
          <DashboardCard icon={<Bookmark />} label="Saved Templates" value={stats?.totalTemplates || 0} hint="Ready to reuse" />
          <DashboardCard icon={<Sparkles />} label="Last Tone" value={stats?.latestReply?.tone || "--"} hint="Most recent AI response" />
          <DashboardCard icon={<Activity />} label="Recent Activity" value={stats?.recentActivity?.length || 0} hint="Replies generated today" />
        </div>

        <QuickActions />
        <DashboardCharts stats={stats} />

        {/* Latest Reply & Recent Activity sections... (same as previous fix) */}

        {/* RECENT ACTIVITY - FIXED */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="glass-card rounded-3xl p-8 mt-10"
        >
          <div className="flex justify-between items-center mb-7">
            <div>
              <p className="text-sm uppercase tracking-[0.12em] text-stone-500">Activity</p>
              <h2 className="text-2xl font-bold mt-1">Recent Replies</h2>
            </div>
            <Link
              to="/history"
              className="text-[#49684d] font-medium flex items-center gap-2 hover:gap-3 transition-all"
            >
              View All <ArrowRight size={18} />
            </Link>
          </div>

          {stats?.recentActivity?.length ? (
            <div className="space-y-5">
              {stats.recentActivity.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ y: -3 }}
                  className="rounded-2xl border border-stone-200 bg-white/70 backdrop-blur-xl p-6 transition-all duration-300 hover:shadow-lg"
                >
                  {/* item content */}
                  <div className="flex justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">
                          {item.tone}
                        </span>
                        <span className="text-xs text-stone-500">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      </div>
                      {item.subject && <h3 className="mt-4 text-lg font-semibold text-stone-900">{item.subject}</h3>}
                      <p className="mt-3 text-stone-600 leading-7 line-clamp-3">{item.generatedReply}</p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button onClick={() => copyReply(item.generatedReply, item._id)} className="rounded-xl border border-green-200 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 flex items-center gap-2 transition-all">
                        <Copy size={16} /> Copy
                      </button>
                      <button onClick={() => deleteReply(item._id)} className="rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 flex items-center gap-2 transition-all">
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <Activity size={60} className="mx-auto text-stone-300" />
              <h3 className="mt-5 text-2xl font-semibold">No Recent Activity</h3>
              <p className="text-stone-500 mt-3">Your generated replies will appear here.</p>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}