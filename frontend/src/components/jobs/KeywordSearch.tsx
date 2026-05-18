interface KeywordSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function KeywordSearch({ value, onChange }: KeywordSearchProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">Search</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search title or description"
        className="mt-1 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
      />
    </label>
  );
}
