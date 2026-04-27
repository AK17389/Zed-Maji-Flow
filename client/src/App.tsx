import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ResidentPortal from "./pages/ResidentPortal";
import CompanyPortal from "./pages/CompanyPortal";
import MonitoringDashboard from "./pages/MonitoringDashboard";

/**
 * Design Philosophy: Modern Minimalist with Gradient Flows
 * - Layered blue gradients representing water flow
 * - Data-centric layouts with animated metrics
 * - Smooth micro-interactions and transitions
 * - Typography: Poppins (headers) + Inter (body)
 */

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/monitoring"} component={MonitoringDashboard} />
      <Route path={"/resident"} component={ResidentPortal} />
      <Route path={"/company"} component={CompanyPortal} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
