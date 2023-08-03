import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const TextWithLineAfter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <div
      className={twMerge(
        "relative flex items-center my-3 w-full after:w-[calc(100%_-_100%)] after:h-[1px] after:ml-2 after:flex-1 after:bg-bg-lightGray dark:after:bg-border-darkGray",
        className,
      )}
    >
      <span className="relative text-block text-font-lightBluePrimary dark:text-font-darkPrimary">
        {children}
      </span>
    </div>
  );
};
