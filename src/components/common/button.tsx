import React from "react";

type StableButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

export default function StableButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: StableButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        min-w-30
        px-4 py-2
        text-white text-base
        bg-black hover:bg-black-800
        rounded-lg
        transition-colors duration-200
        font-bold
        active:scale-[0.97]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black-400 focus-visible:ring-offset-2
        disabled:bg-blue-300 disabled:cursor-not-allowed disabled:scale-100
        select-none
        ${className}
      `}
    >
      {children}
    </button>
  );
}
