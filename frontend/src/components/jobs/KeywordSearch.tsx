interface KeywordSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function KeywordSearch({ value, onChange }: KeywordSearchProps) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-black">Search</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search title or description"
        className="mt-2 h-12 w-full rounded-none border-0 border-b-2 border-neutral-300 bg-white px-3 text-sm text-black outline-none transition placeholder:text-neutral-400 focus:rounded-md focus:border-2 focus:border-black"
      />
    </label>
  );
}
