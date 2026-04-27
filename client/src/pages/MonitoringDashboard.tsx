import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle, CheckCircle2, Droplets, TrendingUp, MapPin } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

/**
 * Design: Modern Minimalist with Gradient Flows
 * - Real-time flow metrics with animated indicators
 * - Multi-zone monitoring with status badges
 * - AI anomaly detection visualization
 * - Animated charts showing flow patterns
 */

interface FlowData {
  time: string;
  zone1: number;
  zone2: number;
  zone3: number;
  zone4: number;
}

interface ZoneStatus {
  id: string;
  name: string;
  status: "normal" | "warning" | "critical";
  flow: number;
  threshold: number;
  lastUpdate: string;
}

export default function MonitoringDashboard() {
  const [, setLocation] = useLocation();
  const [flowData, setFlowData] = useState<FlowData[]>([
    { time: "00:00", zone1: 45, zone2: 52, zone3: 38, zone4: 41 },
    { time: "04:00", zone1: 48, zone2: 55, zone3: 40, zone4: 43 },
    { time: "08:00", zone1: 62, zone2: 68, zone3: 55, zone4: 58 },
    { time: "12:00", zone1: 78, zone2: 85, zone3: 72, zone4: 75 },
    { time: "16:00", zone1: 92, zone2: 98, zone3: 88, zone4: 91 },
    { time: "20:00", zone1: 85, zone2: 88, zone3: 80, zone4: 83 },
  ]);

  const [zones, setZones] = useState<ZoneStatus[]>([
    { id: "z1", name: "Lusaka Central", status: "normal", flow: 92, threshold: 100, lastUpdate: "2 mins ago" },
    { id: "z2", name: "Copperbelt North", status: "warning", flow: 115, threshold: 100, lastUpdate: "1 min ago" },
    { id: "z3", name: "Southend District", status: "normal", flow: 88, threshold: 100, lastUpdate: "3 mins ago" },
    { id: "z4", name: "Westside Zone", status: "critical", flow: 142, threshold: 100, lastUpdate: "Just now" },
  ]);

  const [alertCount, setAlertCount] = useState(3);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFlowData((prev) => {
        const newData = [...prev];
        const lastEntry = newData[newData.length - 1];
        newData.push({
          time: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, "0")}`,
          zone1: Math.max(30, Math.min(150, lastEntry.zone1 + (Math.random() - 0.5) * 20)),
          zone2: Math.max(30, Math.min(150, lastEntry.zone2 + (Math.random() - 0.5) * 20)),
          zone3: Math.max(30, Math.min(150, lastEntry.zone3 + (Math.random() - 0.5) * 20)),
          zone4: Math.max(30, Math.min(150, lastEntry.zone4 + (Math.random() - 0.5) * 20)),
        });
        if (newData.length > 10) newData.shift();
        return newData;
      });

      setZones((prev) =>
        prev.map((zone) => ({
          ...zone,
          flow: Math.max(30, Math.min(150, zone.flow + (Math.random() - 0.5) * 15)),
          status:
            zone.flow > 130
              ? "critical"
              : zone.flow > 110
                ? "warning"
                : "normal",
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statusColors = {
    normal: { bg: "bg-green-100", text: "text-green-700", badge: "bg-green-500" },
    warning: { bg: "bg-yellow-100", text: "text-yellow-700", badge: "bg-yellow-500" },
    critical: { bg: "bg-red-100", text: "text-red-700", badge: "bg-red-500" },
  };

  const zoneStatusData = zones.map((z) => ({
    name: z.name.split(" ")[0],
    value: z.status === "critical" ? 3 : z.status === "warning" ? 2 : 1,
  }));

  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50">
      {/* Header */}
      <header className="border-b border-blue-200/50 bg-white/40 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
              className="hover:bg-blue-100"
            >
              <ArrowLeft className="h-5 w-5 text-blue-900" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-blue-900">AI Monitoring Dashboard</h1>
              <p className="text-sm text-blue-700">Real-time water flow analysis across all zones</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {alertCount}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Total Zones</p>
                  <p className="text-3xl font-bold text-blue-900">4</p>
                </div>
                <MapPin className="h-8 w-8 text-blue-300" />
              </div>
            </div>
          </Card>

          <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Normal Status</p>
                  <p className="text-3xl font-bold text-green-600">2</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-300" />
              </div>
            </div>
          </Card>

          <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Warnings</p>
                  <p className="text-3xl font-bold text-yellow-600">1</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-300" />
              </div>
            </div>
          </Card>

          <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Critical</p>
                  <p className="text-3xl font-bold text-red-600">1</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-300" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-8">
          {/* Flow Trends */}
          <Card className="lg:col-span-2 border-blue-200 bg-white/80 backdrop-blur-sm">
            <div className="p-6">
              <h3 className="mb-4 text-lg font-bold text-blue-900">Flow Trends (24h)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={flowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d0e8ff" />
                  <XAxis dataKey="time" stroke="#1e7fbe" />
                  <YAxis stroke="#1e7fbe" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f5f9ff",
                      border: "1px solid #c0ddff",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="zone1" stroke="#1e7fbe" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="zone2" stroke="#4db8ff" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="zone3" stroke="#00d9ff" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="zone4" stroke="#0f3a7d" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Zone Status Distribution */}
          <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
            <div className="p-6">
              <h3 className="mb-4 text-lg font-bold text-blue-900">Zone Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={zoneStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-blue-700">Normal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="text-blue-700">Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-blue-700">Critical</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Zone Details */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-blue-900">Zone Details</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {zones.map((zone) => (
              <Card
                key={zone.id}
                className={`border-2 ${
                  zone.status === "critical"
                    ? "border-red-300 bg-red-50/40"
                    : zone.status === "warning"
                      ? "border-yellow-300 bg-yellow-50/40"
                      : "border-green-300 bg-green-50/40"
                } backdrop-blur-sm`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-blue-900">{zone.name}</h4>
                      <p className="text-xs text-blue-700 mt-1">{zone.lastUpdate}</p>
                    </div>
                    <div
                      className={`h-3 w-3 rounded-full animate-pulse-glow ${
                        statusColors[zone.status].badge
                      }`}
                    />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-end justify-between mb-2">
                      <span className="text-sm font-semibold text-blue-900">Flow Rate</span>
                      <span className="text-2xl font-bold text-blue-900">
                        {zone.flow.toFixed(1)} L/s
                      </span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          zone.status === "critical"
                            ? "bg-red-500"
                            : zone.status === "warning"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{
                          width: `${Math.min(100, (zone.flow / zone.threshold) * 100)}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-blue-700 mt-2">
                      Threshold: {zone.threshold} L/s
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-blue-300 text-blue-900 hover:bg-blue-50"
                    >
                      View Details
                    </Button>
                    {zone.status !== "normal" && (
                      <Button
                        size="sm"
                        className="flex-1 bg-red-500 text-white hover:bg-red-600"
                      >
                        Alert Company
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
