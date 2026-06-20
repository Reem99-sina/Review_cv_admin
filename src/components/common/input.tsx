import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({
  className = "",
  label,
  error,
  id,
  ...props
}: InputProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-lg text-text-custom font-bold">
          {label}
        </label>
      )}

      <input
        id={id}
        {...props}
        className={`
          w-full
          px-4 py-2.5
          rounded-lg
          border-2
          ${error ? "border-red-500" : "border-text-custom"}
          text-text-custom
          placeholder:text-slate-500
          focus:outline-none
          focus:ring-2
          focus:ring-background/30
          transition-all
          ${className}
        `}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}