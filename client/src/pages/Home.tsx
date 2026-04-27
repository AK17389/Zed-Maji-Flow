import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Droplets, Building2, Gauge, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

/**
 * Design: Modern Minimalist with Gradient Flows
 * - Hero section with gradient background
 * - Three portal cards with hover effects
 * - Clear CTA buttons for navigation
 */

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50">
      {/* Header */}
      <header className="border-b border-blue-200/50 bg-white/40 backdrop-blur-sm">
        <div className="container py-6">
          <div className="flex items-center gap-3">
            <div className="gradient-primary rounded-lg p-2">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-blue-900">Maji Flow</h1>
          </div>
          <p className="mt-2 text-sm text-blue-700">Water Leak Detection & Repair Management System</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-blue-900 md:text-5xl">
            Real-Time Water Flow Monitoring
          </h2>
          <p className="mb-8 text-lg text-blue-700">
            Detect leaks instantly, coordinate repairs efficiently, and manage water resources with AI-powered insights.
          </p>
        </div>
      </section>

      {/* Portal Selection Cards */}
      <section className="container pb-24">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Monitoring Dashboard Card */}
          <Card className="group relative overflow-hidden border-blue-200 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-blue-200/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative p-8">
              <div className="mb-4 inline-flex rounded-lg bg-gradient-secondary p-3">
                <Gauge className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-blue-900">AI Monitoring</h3>
              <p className="mb-6 text-sm text-blue-700">
                Real-time flow analysis with anomaly detection and instant leak alerts across zones.
              </p>
              <Button
                onClick={() => setLocation("/monitoring")}
                className="w-full bg-gradient-primary text-white hover:opacity-90"
              >
                View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Resident Portal Card */}
          <Card className="group relative overflow-hidden border-blue-200 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-blue-200/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative p-8">
              <div className="mb-4 inline-flex rounded-lg bg-gradient-secondary p-3">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-blue-900">Resident Portal</h3>
              <p className="mb-6 text-sm text-blue-700">
                Track water flow status, receive alerts, find repair companies, and manage your account.
              </p>
              <Button
                onClick={() => setLocation("/resident")}
                className="w-full bg-gradient-primary text-white hover:opacity-90"
              >
                Access Portal <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Company Portal Card */}
          <Card className="group relative overflow-hidden border-blue-200 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-blue-200/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative p-8">
              <div className="mb-4 inline-flex rounded-lg bg-gradient-secondary p-3">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-blue-900">Company Portal</h3>
              <p className="mb-6 text-sm text-blue-700">
                Manage appointments, track service history, update availability, and grow your business.
              </p>
              <Button
                onClick={() => setLocation("/company")}
                className="w-full bg-gradient-primary text-white hover:opacity-90"
              >
                Access Portal <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-200/50 bg-white/40 py-8 backdrop-blur-sm">
        <div className="container text-center text-sm text-blue-700">
          <p>© 2026 Maji Flow. Innovative water management for sustainable communities.</p>
        </div>
      </footer>
    </div>
  );
}
