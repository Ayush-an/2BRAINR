import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const weeklyScores = [
  { exam: "Java", score: 80 },
  { exam: "DSA", score: 92 },
];

const overall = [
  { name: "Correct", value: 85 },
  { name: "Wrong", value: 15 },
];

export default function Results() {
  return (
    <div className="space-y-6">

      <div className="card">
        <h3 className="card-title">Weekly Results</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyScores}>
            <XAxis dataKey="exam" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="card-title">Overall Performance</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={overall}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
