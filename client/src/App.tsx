import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Hospitals from "@/pages/hospitals";
import HospitalDetails from "@/pages/hospital-details";
import HealthUnits from "@/pages/health-units";
import HealthUnitDetails from "@/pages/health-unit-details";
import DialysisCenters from "@/pages/dialysis-centers";
import DialysisCenterDetails from "@/pages/dialysis-center-details";
import EmergencyServices from "@/pages/emergency-services";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/hospitals" component={Hospitals} />
      <Route path="/hospitals/:id" component={HospitalDetails} />
      <Route path="/health-units" component={HealthUnits} />
      <Route path="/health-units/:id" component={HealthUnitDetails} />
      <Route path="/dialysis-centers" component={DialysisCenters} />
      <Route path="/dialysis-centers/:id" component={DialysisCenterDetails} />
      <Route path="/emergency-services" component={EmergencyServices} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;