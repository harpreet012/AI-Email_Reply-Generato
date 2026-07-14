import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PenSquare,
  History,
  Bookmark,
  Download,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "New Reply",
    description: "Generate a new AI email reply",
    icon: PenSquare,
    to: "/generator",
  },
  {
    title: "History",
    description: "Browse previous replies",
    icon: History,
    to: "/history",
  },
  {
    title: "Saved Replies",
    description: "Open saved templates",
    icon: Bookmark,
    to: "/saved",
  },
  {
    title: "Export",
    description: "Download your replies",
    icon: Download,
    to: "/history",
  },
];

export default function QuickActions() {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Quick Actions</h2>

          <p className="text-stone-500 mt-1">Frequently used shortcuts</p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
              }}
            >
              <Link
                to={action.to}
                className="
                group
                block
                rounded-3xl
                border
                border-stone-200
                bg-white/70
                backdrop-blur-xl
                p-6
                shadow-sm
                hover:shadow-xl
                hover:border-[#49684d]/30
                transition-all
                duration-300
                h-full
              "
              >
                <div className="flex items-center justify-between">
                  <div
                    className="
                    h-14
                    w-14
                    rounded-2xl
                    bg-[#49684d]/10
                    text-[#49684d]
                    flex
                    items-center
                    justify-center
                    group-hover:scale-110
                    transition
                  "
                  >
                    <Icon size={26} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="
                    text-stone-400
                    group-hover:text-[#49684d]
                    group-hover:translate-x-1
                    transition
                  "
                  />
                </div>

                <h3 className="mt-8 text-xl font-semibold text-stone-900">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-stone-500">
                  {action.description}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
