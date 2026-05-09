"use client";

import { Header } from "@/components/header";
import Sidebar from "@/components/sidebar";
import { useUserStore } from "@/stores/useUserStore";

export function AppProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const { user } = useUserStore();

   return (
      <div className="flex min-h-screen w-full">
         <div className="flex min-w-0 flex-1 flex-col">
            <Header />

            <main className="flex flex-1 overflow-auto bg-gradient-to-br from-white via-neutral-300 to-white w-full dark:bg-gradient-to-br dark:from-black dark:via-zinc-700 dark:to-black">
               {user && <Sidebar />}

               {children}
            </main>
         </div>
      </div>
   );
}