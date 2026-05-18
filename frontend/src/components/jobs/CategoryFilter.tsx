import { JOB_CATEGORIES } from "@/lib/constants";
import { Select } from "@/components/ui/Select";

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <Select
      label="Category"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="">All categories</option>
      {JOB_CATEGORIES.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </Select>
  );
}
