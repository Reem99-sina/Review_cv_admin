import { SelectHTMLAttributes } from "react";

type Option = {
  label: string;
  value?: string;
  key?:string
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
};

export default function Select({
  options,
  className = "",
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      className={`
        w-full
        px-4 py-2.5
        rounded-xl
        bg-slate-900
        border border-white/10
        text-white
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500/30
        focus:border-blue-500
        transition-all
        ${className}
      `}
    >
      {options.map((option) => (
        <option
          key={option.key}
          value={option.key}
          className="bg-slate-900"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}