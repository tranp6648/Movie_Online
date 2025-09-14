"use client";

import { Eye, Grid, MessageCircle, RotateCw, Star, BarChart3 } from "lucide-react";
import { useState } from "react";

const stats = [
  { label: "Unique views this month", value: "5 678", icon: <Eye className="w-5 h-5" /> },
  { label: "Items added this month", value: "172", icon: <Grid className="w-5 h-5" /> },
  { label: "New comments", value: "2 573", icon: <MessageCircle className="w-5 h-5" /> },
  { label: "New reviews", value: "1021", icon: <Star className="w-5 h-5" /> },
];
const latestItems = [
  { id: 26, title: "I Dream in Another Language", category: "Movie", status: "Visible" },
  { id: 25, title: "Benched", category: "Movie", status: "Visible" },
  { id: 24, title: "Whitney", category: "TV Show", status: "Visible" },
  { id: 23, title: "Blindspotting 2", category: "TV Show", status: "Visible" },
  { id: 22, title: "Blindspotting", category: "TV Show", status: "Visible" },
];

const latestReviews = [
  { id: 51, item: "I Dream in Another Language", author: "Jonathan Banks", rating: 7.2 },
  { id: 50, item: "Benched", author: "Charles Baker", rating: 6.3 },
  { id: 49, item: "Whitney", author: "Matt Jones", rating: 8.4 },
  { id: 48, item: "Blindspotting", author: "Jesse Plemons", rating: 9.0 },
  { id: 47, item: "I Dream in Another Language", author: "Brian Cranston", rating: 7.7 },
];
const topItems = [
  { id: 321, title: "I Dream in Another Language", category: "Movie", rating: 9.2 },
  { id: 54, title: "Benched", category: "Movie", rating: 9.1 },
  { id: 670, title: "Whitney", category: "TV Show", rating: 9.0 },
  { id: 241, title: "Blindspotting 2", category: "TV Show", rating: 8.9 },
  { id: 22, title: "Blindspotting", category: "TV Show", rating: 8.9 },
];
const latestUsers = [
  { id: 23, name: "Brian Cranston", email: "bcxwz@email.com", username: "BrianXWZ" },
  { id: 22, name: "Jesse Plemons", email: "jess@email.com", username: "Jesse.P" },
  { id: 21, name: "Matt Jones", email: "matt@email.com", username: "Matty" },
  { id: 20, name: "Tess Harper", email: "harper@email.com", username: "Harper123" },
  { id: 19, name: "Jonathan Banks", email: "bank@email.com", username: "Jonathan" },
];


const HomeContent = () => {
  const [loading, setLoading] = useState(false);

  const handleReload = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[#151f30] p-5 rounded-xl flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-400">{s.label}</p>
              <h2 className="text-2xl font-bold text-white">{s.value}</h2>
            </div>
            <div className="text-blue-400">{s.icon}</div>
          </div>
        ))}
      </div>

      {/* Top items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#151f30] p-4 rounded-2xl shadow-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold flex items-center gap-2 text-gray-100">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              Top items
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReload}
                disabled={loading}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <RotateCw
                  className={`w-4 h-4 text-gray-300 ${loading ? "animate-spin" : ""}`}
                />
              </button>
              <button className="text-xs bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-700 transition-colors">
                View All
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-sm text-left">
            <thead className="text-gray-400 border-b border-gray-700 uppercase text-xs mb-2">
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">TITLE</th>
                <th className="py-2">CATEGORY</th>
                <th className="py-2">RATING</th>
              </tr>
            </thead>
            <tbody>
              {topItems.map((item) => (
                <tr
                  key={item.id}
                  className=" border-gray-800 hover:bg-gray-800/40 transition-colors"
                >
                  <td className="py-2">{item.id}</td>
                  <td className="py-2">{item.title}</td>
                  <td className="py-2">{item.category}</td>
                  <td className="text-blue-400 flex items-center gap-1 py-2">
                    <Star className="w-4 h-4" /> {item.rating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-[#151f30] p-4 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold flex items-center gap-2">🆕 Latest items</h3>
            <button className="text-xs bg-gray-800 px-3 py-1 rounded-lg">View All</button>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="text-gray-400 border-b border-gray-700 uppercase text-xs mb-2">
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">TITLE</th>
                <th className="py-2">CATEGORY</th>
                <th className="py-2">RATING</th>
              </tr>
            </thead>
            <tbody>
              {latestItems.map((item) => (
                <tr
                  key={item.id}
                  className=" border-gray-800 hover:bg-gray-800/40 transition-colors"
                >
                  <td className="py-2">{item.id}</td>
                  <td className="py-2">{item.title}</td>
                  <td className="py-2">{item.category}</td>
                  <td className="text-blue-400 flex items-center gap-1 py-2">
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#151f30] p-4 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold flex items-center gap-2">👥 Latest users</h3>
            <button className="text-xs bg-gray-800 px-3 py-1 rounded-lg">View All</button>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="py-1">ID</th>
                <th>FULL NAME</th>
                <th>EMAIL</th>
                <th>USERNAME</th>
              </tr>
            </thead>
            <tbody>
              {latestUsers.map((u) => (
                <tr key={u.id} className=" border-gray-800">
                  <td className="py-2">{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-[#151f30] p-4 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold flex items-center gap-2">⭐ Latest reviews</h3>
            <button className="text-xs bg-gray-800 px-3 py-1 rounded-lg">View All</button>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="text-gray-400 border-b border-gray-700">
            <tr>
                <th className="py-1">ID</th>
                <th>ITEM</th>
                <th>AUTHOR</th>
                <th>RATING</th>
              </tr>
            </thead>
            <tbody>
            {latestReviews.map((r) => (
                <tr key={r.id} className=" border-gray-800">
                  <td className="py-2">{r.id}</td>
                  <td>{r.item}</td>
                  <td>{r.author}</td>
                  <td className="text-blue-400">⭐ {r.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
