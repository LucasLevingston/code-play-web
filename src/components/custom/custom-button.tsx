"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type CustomButtonProps = React.ComponentProps<typeof Button>;

export const CustomButton = ({
  className,
  children,
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      {...props}
      className={cn(
        "h-14 w-full w-[366px] rounded-full bg-gradient-to-r from-[#FF8B9B] to-[#FF7389] font-bold text-background transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:shadow-[#FF8B9B]/50",
        className,
      )}
    >
      {children}
    </Button>
  );
};