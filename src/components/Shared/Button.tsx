import { clsx } from "clsx";
import React from "react";

interface Props {
  children: React.ReactNode;
  type: "button" | "submit";
  style: string;
  onClick?: () => void;
}

const Button = ({ children, type, style, onClick }: Props) => {
  return (
    <button
      type={type}
      className={clsx(
        "flex items-center justify-center gap-1 rounded-3xl py-2.5 px-4.5 text-center text-white focus:outline-offset-2 focus-visible:outline-offset-2",
        style === "main-thin" && "bg-[#635FC7] text-sm font-light hover:bg-[#6e6adf] sm:flex",
        style === "main-bold" && "bg-[#635FC7] font-bold hover:bg-[#6e6adf]",
        style === "secondary" &&
        "mt-1.5 gap-1 bg-main-purple/20 text-sm font-bold text-main-purple hover:bg-main-purple/10 dark:text-white/90 dark:hover:bg-main-purple/30"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
