import { cn } from "@/lib/utils";
import { LoadingPage } from "./loading/loading-page";
import { PageLayout } from "./page-layout";

interface QueryBoundaryProps {
   isLoading: boolean;
   error: unknown;
   children: React.ReactNode;
   className?: string;
}

export function QueryBoundary({
   isLoading,
   error,
   children,
   className,
}: QueryBoundaryProps) {
   if (isLoading) {
      return <LoadingPage />;
   }

   if (error) {
      return <div className={className}>Erro ao carregar dados</div>;
   }

   return (<PageLayout className={cn(className, "")}>

      {children}
   </PageLayout>
   );
}