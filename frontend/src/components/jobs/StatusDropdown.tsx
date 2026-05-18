import { JOB_STATUSES, type JobStatus } from "@/lib/constants";
import { Select } from "@/components/ui/Select";

interface StatusDropdownProps {
  value: JobStatus;
  label?: string;
  disabled?: boolean;
  onChange: (status: JobStatus) => void;
}

export function StatusDropdown({
  value,
  label = "Status",
  disabled = false,
  onChange,
}: StatusDropdownProps) {
  return (
    <Select
      label={label}
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value as JobStatus)}
    >
      {JOB_STATUSES.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </Select>
  );
}
