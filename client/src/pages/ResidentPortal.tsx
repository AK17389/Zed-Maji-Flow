import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Droplets, AlertTriangle, Phone, MapPin, Star, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

/**
 * Design: Modern Minimalist with Gradient Flows
 * - Resident authentication and profile management
 * - Real-time flow status display
 * - Service directory with company filtering
 * - Account management interface
 */

interface Company {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  phone: string;
  coverage: string;
  availability: string;
  responseTime: string;
}

export default function ResidentPortal() {
  const [, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const [companies] = useState<Company[]>([
    {
      id: "c1",
      name: "Lusaka Plumbing Solutions",
      rating: 4.8,
      reviews: 142,
      phone: "+260 96 123 4567",
      coverage: "Lusaka Central, Southend",
      availability: "24/7",
      responseTime: "30 mins",
    },
    {
      id: "c2",
      name: "Copperbelt Repair Services",
      rating: 4.6,
      reviews: 98,
      phone: "+260 97 234 5678",
      coverage: "Copperbelt North, West",
      availability: "6 AM - 10 PM",
      responseTime: "45 mins",
    },
    {
      id: "c3",
      name: "Expert Water Systems",
      rating: 4.9,
      reviews: 267,
      phone: "+260 95 345 6789",
      coverage: "All zones",
      availability: "24/7",
      responseTime: "20 mins",
    },
    {
      id: "c4",
      name: "Quick Fix Plumbing",
      rating: 4.5,
      reviews: 76,
      phone: "+260 96 456 7890",
      coverage: "Westside, Southend",
      availability: "7 AM - 9 PM",
      responseTime: "60 mins",
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

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-blue-200 bg-white/80 backdrop-blur-sm">
          <div className="p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 inline-flex rounded-lg bg-gradient-primary p-3">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-blue-900">Resident Portal</h1>
              <p className="mt-2 text-sm text-blue-700">Login to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
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
              <h1 className="text-2xl font-bold text-blue-900">Resident Dashboard</h1>
              <p className="text-sm text-blue-700">Welcome, John Doe</p>
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
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="directory" className="data-[state=active]:bg-white">
              Service Directory
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-white">
              Account
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Status Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-green-300 bg-green-50/40 backdrop-blur-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700">Current Status</p>
                      <p className="text-2xl font-bold text-green-900 mt-2">Normal</p>
                    </div>
                    <Droplets className="h-8 w-8 text-green-300" />
                  </div>
                </div>
              </Card>

              <Card className="border-blue-300 bg-blue-50/40 backdrop-blur-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700">Flow Rate</p>
                      <p className="text-2xl font-bold text-blue-900 mt-2">87.5 L/s</p>
                    </div>
                    <Droplets className="h-8 w-8 text-blue-300" />
                  </div>
                </div>
              </Card>

              <Card className="border-yellow-300 bg-yellow-50/40 backdrop-blur-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-yellow-700">Alerts Today</p>
                      <p className="text-2xl font-bold text-yellow-900 mt-2">0</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-yellow-300" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="mb-4 text-lg font-bold text-blue-900">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b border-blue-200">
                    <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Droplets className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900">Flow Status Normal</p>
                      <p className="text-sm text-blue-700">All zones operating within normal parameters</p>
                      <p className="text-xs text-blue-600 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-secondary flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900">Maintenance Completed</p>
                      <p className="text-sm text-blue-700">Zone 2 maintenance finished successfully</p>
                      <p className="text-xs text-blue-600 mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Service Directory Tab */}
          <TabsContent value="directory" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {companies.map((company) => (
                <Card key={company.id} className="border-blue-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-blue-900">{company.name}</h4>
                        <div className="flex items-center gap-1 mt-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(company.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-blue-900">{company.rating}</span>
                          <span className="text-xs text-blue-700">({company.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-blue-700">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span>{company.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-700">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span>{company.coverage}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-700">
                        <Droplets className="h-4 w-4 flex-shrink-0" />
                        <span>Response: {company.responseTime}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-primary text-white hover:opacity-90">
                        Contact
                      </Button>
                      <Button variant="outline" className="flex-1 border-blue-300 text-blue-900 hover:bg-blue-50">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
              <div className="p-6">
                <h3 className="mb-6 text-lg font-bold text-blue-900">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">Full Name</label>
                    <Input
                      defaultValue="John Doe"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">Email</label>
                    <Input
                      type="email"
                      defaultValue="john@example.com"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">Phone Number</label>
                    <Input
                      defaultValue="+260 96 123 4567"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">Zone</label>
                    <Input
                      defaultValue="Lusaka Central"
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
                <h3 className="mb-4 text-lg font-bold text-blue-900">Notification Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">SMS Alerts</span>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Email Notifications</span>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Weekly Reports</span>
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
