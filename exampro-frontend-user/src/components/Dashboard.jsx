import { FiBookOpen, FiTrendingUp, FiClock, FiAlertCircle, FiFile } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const activityData = [
  { day: "Mon", score: 40 },
  { day: "Tue", score: 72 },
  { day: "Wed", score: 50 },
  { day: "Thu", score: 90 },
  { day: "Fri", score: 60 },
  { day: "Sat", score: 95 },
  { day: "Sun", score: 70 },
];

export default function Dashboard() {
  return (
<div className="w-full space-y-6">
      {/* Quick Link Buttons */}
<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: <FiBookOpen />, label: "View Exams" },
          { icon: <FiTrendingUp />, label: "Results" },
          { icon: <FiClock />, label: "Upcoming" },
          { icon: <FiFile />, label: "Notice" },

        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center py-6 cursor-pointer card hover:scale-105">
            <div className="mb-2 text-3xl text-blue-600">{item.icon}</div>
            <p className="font-semibold">{item.label}</p>
          </div>
        ))}
      </div>
      
<div className="flex gap-5 pb-2 overflow-x-auto">
  {/* Upcoming Exams */}
  <div className="card min-w-[280px] bg-gradient-to-r from-purple-300 to-indigo-200">
    <h3 className="text-blue-600 card-title ">Upcoming Exams</h3>
    <ul className="mt-4 space-y-2 text-gray-800">
      <li>Java Exam — Aug 25, 2025</li>
      <li>DSA Mock Test — Aug 27, 2025</li>
      <li>Cyber Security Quiz — Sep 1, 2025</li>
    </ul>
  </div>

  {/* Reports */}
  <div className="card min-w-[280px] bg-gradient-to-r from-purple-300 to-indigo-200">
    <h3 className="text-blue-600 card-title ">Reports</h3>
    <ul className="mt-4 space-y-2 text-gray-800">
      <li>NEW REPORTS</li>
      <li>OLD REPORTS</li>
    </ul>
  </div>

  {/* Feedback */}
  <div className="card min-w-[280px] bg-gradient-to-r from-purple-300 to-indigo-200">
    <h3 className="text-blue-600 card-title ">Feedback</h3>
    <ul className="mt-4 space-y-2 text-gray-800">
      <li>NEW FEEDBACK</li>
    </ul>
  </div>

  {/* Performance */}
  <div className="card min-w-[280px] bg-gradient-to-r from-purple-300 to-indigo-200">
    <h3 className="text-blue-600 card-title">Performance</h3>
    <ul className="mt-4 space-y-2 text-gray-800">
      <li>PERFORMANCE REPORT</li>
    </ul>
  </div>
</div>


      {/* Weekly Activity */}
      <div className="card">
        <h3 className="card-title">Weekly Activity</h3>
<ResponsiveContainer width="100%" minHeight={250}>
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#6366f1"
              strokeWidth={4}
              dot={{ r: 5, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
