import { motion } from "framer-motion";

export default function DashboardCard({ icon, label, value, hint, trend }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-stone-200/70
      bg-white/65
      backdrop-blur-xl
      shadow-sm
      hover:shadow-xl
      hover:border-[#49684d]/25
      transition-all
      duration-300
      p-6
      h-[190px]
      "
    >
      {/* Decorative Circle */}

      <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-[#49684d]/5 group-hover:bg-[#49684d]/10 transition-all" />

      {/* Icon */}

      <div
        className="
        h-14
        w-14
        rounded-2xl
        border
        border-[#49684d]/15
        bg-[#49684d]/8
        flex
        items-center
        justify-center
        text-[#49684d]
        mb-6
      "
      >
        {icon}
      </div>

      {/* Label */}

      <p className="uppercase tracking-[0.12em] text-[11px] text-stone-500 font-semibold">
        {label}
      </p>

      {/* Value */}

      <h2 className="text-5xl font-bold mt-2 text-stone-900">{value}</h2>

      {/* Hint */}

      <p className="mt-3 text-stone-500 text-sm">{hint}</p>

      {/* Trend */}

      {trend && (
        <div className="absolute bottom-6 right-6">
          <span className="rounded-full bg-green-100 text-green-700 text-xs font-medium px-3 py-1">
            {trend}
          </span>
        </div>
      )}
    </motion.div>
  );
}
