import { ReactNode } from "react";

type Props = {
  title: string;
  value: string | number;
  icon?: ReactNode;
};

export function Card({ title, value, icon }: Props) {
  return (
    <div
      className=" bg-background text-text-custom  w-full
        p-4 rounded-xl
        border border-slate-950
        shadow-md
        hover:scale-[1.02]
        transition"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-lg text-slate-400  whitespace-nowrap ">{title}</p>
        <div>{icon}</div>
        
      </div>
      <h3 className="text-xl font-bold text-secondary mt-1">{value}</h3>
    </div>
  );
}
