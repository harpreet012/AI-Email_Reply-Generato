import { Search, X } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          pl-11
          pr-12
          py-3
          rounded-2xl
          bg-white/10
          border border-white/20
          backdrop-blur-xl
          text-white
          placeholder:text-gray-400
          outline-none
          transition-all
          duration-300
          focus:border-indigo-400
          focus:ring-2
          focus:ring-indigo-500/30
          hover:border-white/30
        "
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition"
        >
          <X size={16} className="text-gray-300" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;