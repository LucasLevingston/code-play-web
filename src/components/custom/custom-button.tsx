"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type CustomButtonProps = React.ComponentProps<typeof Button>;

export const CustomButton = (props: CustomButtonProps) =>{
   return <Button className={cn(
"w-full min-w-[366px] h-[56px] bg-gradient-to-r from-[#FF8B9B] to-[#FF7389] hover:shadow-lg hover:shadow-[#FF8B9B]/50 transition from-[#FF8B9B] to-[#FF7389] text-background font-bold rounded-full transition-all duration-200 hover:brightness-110",    props.className
   )}
   {...props}
   >
     {props.children}
   </Button>
}