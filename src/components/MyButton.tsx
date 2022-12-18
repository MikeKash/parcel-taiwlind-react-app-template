import clsx from "clsx";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

const btnStyleClasses = {
  primary: "bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800",
  secondary: "bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800",
};

const MyButton = ({
  variant = "primary",
  type,
  children,
  onClick,
}: {
  variant?: "primary" | "secondary";
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
} & PropsWithChildren) => {
  return (
    <button
      type={type}
      className={clsx(
        btnStyleClasses[variant],
        "inline-block px-7 py-3 00 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MyButton;
