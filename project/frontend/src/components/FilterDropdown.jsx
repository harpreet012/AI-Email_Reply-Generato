import { Filter } from "lucide-react";

const FilterDropdown = ({ options = [], value, onChange, label = "All" }) => {
  return (
    <div className="relative">
      <Filter
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          appearance-none
          pl-11
          pr-8
          py-3
          rounded-2xl
          bg-white/10
          border
          border-white/20
          backdrop-blur-xl
          text-white
          outline-none
          transition-all
          duration-300
          hover:border-white/30
          focus:border-indigo-400
          cursor-pointer
        "
      >
        <option value="">{label}</option>

        {options.map((item) => (
          <option key={item} value={item} className="bg-slate-900 text-white">
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
