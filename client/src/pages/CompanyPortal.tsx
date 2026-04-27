import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Building2, CheckCircle2, Clock, MapPin, Phone, LogOut, Trash2 } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

/**
 * Design: Modern Minimalist with Gradient Flows
 * - Company authentication and profile management
 * - Kanban-style appointment management
 * - Service history and audit logs
 * - Availability and coverage management
 */

interface Appointment {
  id: string;
  residentName: string;
  zone: string;
  phone: string;
  issue: string;
  scheduledTime: string;
  status: "pending" | "in-progress" | "completed";
}

export default function CompanyPortal() {
  const [, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("appointments");

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "a1",
      residentName: "John Doe",
      zone: "Lusaka Central",
      phone: "+260 96 123 4567",
      issue: "Suspected pipe leak in basement",
      scheduledTime: "Today, 2:30 PM",
      status: "pending",
    },
    {
      id: "a2",
      residentName: "Sarah Smith",
      zone: "Southend District",
      phone: "+260 97 234 5678",
      issue: "Water meter malfunction",
      scheduledTime: "Today, 4:00 PM",
      status: "pending",
    },
    {
      id: "a3",
      residentName: "Mike Johnson",
      zone: "Copperbelt North",
      phone: "+260 95 345 6789",
      issue: "Leak detected in main line",
      scheduledTime: "Today, 10:30 AM",
      status: "in-progress",
    },
    {
      id: "a4",
      residentName: "Emma Wilson",
      zone: "Westside Zone",
      phone: "+260 96 456 7890",
      issue: "Pipe replacement completed",
      scheduledTime: "Yesterday, 3:00 PM",
      status: "completed",
    },
    {
      id: "a5",
      residentName: "David Brown",
      zone: "Lusaka Central",
      phone: "+260 97 567 8901",
      issue: "Routine maintenance check",
      scheduledTime: "2 days ago",
      status: "completed",
    },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
    }
  };

  const updateAppointmentStatus = (id: string, newStatus: "pending" | "in-progress" | "completed") => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  };

  const pendingAppointments = appointments.filter((a) => a.status === "pending");
  const inProgressAppointments = appointments.filter((a) => a.status === "in-progress");
  const completedAppointments = appointments.filter((a) => a.status === "completed");

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-blue-200 bg-white/80 backdrop-blur-sm">
          <div className="p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 inline-flex rounded-lg bg-gradient-primary p-3">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-blue-900">Company Portal</h1>
              <p className="mt-2 text-sm text-blue-700">Login to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="company@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-primary text-white hover:opacity-90">
                Login
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-blue-200">
              <p className="text-center text-sm text-blue-700">
                Demo credentials: any email & password
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => setLocation("/")}
              className="w-full mt-4 border-blue-300 text-blue-900 hover:bg-blue-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

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
              <h1 className="text-2xl font-bold text-blue-900">Company Dashboard</h1>
              <p className="text-sm text-blue-700">Expert Water Systems</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLoggedIn(false)}
            className="border-blue-300 text-blue-900 hover:bg-blue-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-blue-100/50 border border-blue-200">
            <TabsTrigger value="appointments" className="data-[state=active]:bg-white">
              Appointments
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-white">
              Service History
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-white">
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Appointments Tab - Kanban View */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Pending Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <h3 className="font-bold text-blue-900">Pending ({pendingAppointments.length})</h3>
                </div>
                <div className="space-y-3">
                  {pendingAppointments.map((apt) => (
                    <Card
                      key={apt.id}
                      className="border-yellow-300 bg-yellow-50/40 backdrop-blur-sm cursor-move hover:shadow-md transition-shadow"
                    >
                      <div className="p-4">
                        <h4 className="font-semibold text-blue-900">{apt.residentName}</h4>
                        <p className="text-xs text-blue-700 mt-1">{apt.zone}</p>
                        <p className="text-sm text-blue-700 mt-2">{apt.issue}</p>
                        <p className="text-xs text-yellow-700 mt-2 font-medium">{apt.scheduledTime}</p>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
                            onClick={() => updateAppointmentStatus(apt.id, "in-progress")}
                          >
                            Start
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                            onClick={() => deleteAppointment(apt.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* In Progress Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="font-bold text-blue-900">In Progress ({inProgressAppointments.length})</h3>
                </div>
                <div className="space-y-3">
                  {inProgressAppointments.map((apt) => (
                    <Card
                      key={apt.id}
                      className="border-blue-300 bg-blue-50/40 backdrop-blur-sm cursor-move hover:shadow-md transition-shadow"
                    >
                      <div className="p-4">
                        <h4 className="font-semibold text-blue-900">{apt.residentName}</h4>
                        <p className="text-xs text-blue-700 mt-1">{apt.zone}</p>
                        <p className="text-sm text-blue-700 mt-2">{apt.issue}</p>
                        <p className="text-xs text-blue-700 mt-2 font-medium">{apt.scheduledTime}</p>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            className="flex-1 bg-green-500 text-white hover:bg-green-600"
                            onClick={() => updateAppointmentStatus(apt.id, "completed")}
                          >
                            Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-300 text-blue-700 hover:bg-blue-50"
                            onClick={() => updateAppointmentStatus(apt.id, "pending")}
                          >
                            Back
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Completed Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <h3 className="font-bold text-blue-900">Completed ({completedAppointments.length})</h3>
                </div>
                <div className="space-y-3">
                  {completedAppointments.map((apt) => (
                    <Card
                      key={apt.id}
                      className="border-green-300 bg-green-50/40 backdrop-blur-sm opacity-75"
                    >
                      <div className="p-4">
                        <h4 className="font-semibold text-blue-900">{apt.residentName}</h4>
                        <p className="text-xs text-blue-700 mt-1">{apt.zone}</p>
                        <p className="text-sm text-blue-700 mt-2">{apt.issue}</p>
                        <p className="text-xs text-green-700 mt-2 font-medium">{apt.scheduledTime}</p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full mt-3 border-green-300 text-green-700 hover:bg-green-50"
                          onClick={() => deleteAppointment(apt.id)}
                        >
                          <Trash2 className="h-3 w-3 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Service History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="mb-4 text-lg font-bold text-blue-900">Service History</h3>
                <div className="space-y-4">
                  {completedAppointments.map((apt) => (
                    <div key={apt.id} className="flex items-start gap-4 pb-4 border-b border-blue-200 last:border-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-blue-900">{apt.residentName}</p>
                        <p className="text-sm text-blue-700 mt-1">{apt.issue}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-blue-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {apt.zone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {apt.phone}
                          </span>
                          <span>{apt.scheduledTime}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-300 text-blue-900 hover:bg-blue-50"
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="mb-6 text-lg font-bold text-blue-900">Company Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">Company Name</label>
                    <Input
                      defaultValue="Expert Water Systems"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">Email</label>
                    <Input
                      type="email"
                      defaultValue="info@expertwater.com"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">Phone</label>
                    <Input
                      defaultValue="+260 95 345 6789"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">Coverage Areas</label>
                    <Input
                      defaultValue="All zones"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="mb-4 text-lg font-bold text-blue-900">Availability</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">24/7 Service</span>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Emergency Response</span>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Preventive Maintenance</span>
                    <input type="checkbox" className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
