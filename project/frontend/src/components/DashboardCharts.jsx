import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#49684d", "#79966d", "#b7c9a8", "#d9e4d2"];

export default function DashboardCharts({ stats }) {
  const timeline = stats?.timeline?.length
    ? stats.timeline
    : [
        { day: "Mon", replies: 0 },
        { day: "Tue", replies: 0 },
        { day: "Wed", replies: 0 },
        { day: "Thu", replies: 0 },
        { day: "Fri", replies: 0 },
        { day: "Sat", replies: 0 },
        { day: "Sun", replies: 0 },
      ];

  const tones = stats?.toneDistribution?.length
    ? stats.toneDistribution
    : [{ name: "No Data", value: 1 }];

  return (
    <section className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">
            Activity Overview
          </h2>

          <p className="text-stone-500 mt-1">
            Weekly activity and tone distribution
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        {/* Timeline */}

        <div
          className="
            rounded-3xl
            bg-white/70
            backdrop-blur-xl
            border
            border-stone-200
            shadow-sm
            p-6
          "
        >
          <h3 className="font-semibold text-lg text-stone-900 mb-6">
            Reply Timeline
          </h3>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={timeline}>
              <CartesianGrid stroke="#ece6da" />

              <XAxis dataKey="day" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Line
                dataKey="replies"
                stroke="#49684d"
                strokeWidth={3}
                dot={{
                  r: 5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Donut */}

        <div
          className="
            rounded-3xl
            bg-white/70
            backdrop-blur-xl
            border
            border-stone-200
            shadow-sm
            p-6
          "
        >
          <h3 className="font-semibold text-lg text-stone-900 mb-6">
            Tone Distribution
          </h3>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={tones}
                innerRadius={70}
                outerRadius={100}
                dataKey="value"
                paddingAngle={4}
              >
                {tones.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {tones.map((tone, index) => (
              <div key={tone.name} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: COLORS[index % COLORS.length],
                  }}
                />

                <span className="text-sm text-stone-600">{tone.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
