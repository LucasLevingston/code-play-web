import { AppProvider } from "@/components/providers/app-provider";
import QueryProvider from "@/components/providers/QueryProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { ThemeProvider } from "@/components/providers/theme-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
   return (
<div className="text-zinc-600 dark:text-white">
<ThemeProvider 

attribute="class"
defaultTheme="system"
enableSystem
disableTransitionOnChange
>
<QueryProvider>
<ToastProvider />
<AppProvider>
{children}
</AppProvider>
</QueryProvider>
</ThemeProvider>

</div>
   )
}

export default Providers;