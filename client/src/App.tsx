import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Hospitals from "@/pages/hospitals";
import HealthUnits from "@/pages/health-units";
import Dialysis from "@/pages/dialysis";
import Emergency from "@/pages/emergency";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/hospitals" component={Hospitals} />
      <Route path="/health-units" component={HealthUnits} />
      <Route path="/dialysis" component={Dialysis} />
      <Route path="/emergency" component={Emergency} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
