import React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Background } from "@/components/ui/background";
import { Layout } from "@/components/layout/Layout";
import { 
  Users, 
  Activity, 
  Database, 
  BarChart3, 
  LineChart, 
  PieChart,
  Clock,
  AlertTriangle
} from "lucide-react";
import styles from "./AnalyticsPage.module.css";

interface AnalyticsData {
  totalUsers: number;
  activeSessions: number;
  storageUsed: number;
  apiRequests: number;
  performance: {
    averageResponseTime: number;
    cpuUsage: number;
    memoryUsage: number;
    networkTraffic: number;
  };
  errors: Array<{
    id: string;
    level: "error" | "warning";
    message: string;
    timestamp: string;
  }>;
}

// Mock data for analytics
const mockAnalyticsData: AnalyticsData = {
  totalUsers: 1250,
  activeSessions: 85,
  storageUsed: 2.5 * 1024, // 2.5 TB in GB
  apiRequests: 15000,
  performance: {
    averageResponseTime: 120,
    cpuUsage: 45,
    memoryUsage: 60,
    networkTraffic: 75
  },
  errors: [
    {
      id: "1",
      level: "warning",
      message: "High memory usage detected",
      timestamp: new Date().toISOString()
    },
    {
      id: "2",
      level: "error",
      message: "API endpoint timeout",
      timestamp: new Date().toISOString()
    }
  ]
};

const getProgressWidth = (value: number, max: number = 100) => {
  const percentage = Math.min(100, Math.round((value / max) * 100));
  return Math.floor(percentage / 10) * 10;
};

export const AnalyticsPage = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setData(mockAnalyticsData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Background 
        image="/images/image (3).jpg"
        overlayOpacity={0.85}
      >
        <Layout>
          <div className="container mx-auto py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary mb-4">Loading Analytics...</h1>
              <div className="flex justify-center">
                <Clock className="h-8 w-8 animate-spin text-primary" />
              </div>
            </div>
          </div>
        </Layout>
      </Background>
    );
  }

  return (
    <Background 
      image="/images/image (3).jpg"
      overlayOpacity={0.85}
    >
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-primary mb-4">Platform Analytics</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive overview of platform performance and user engagement
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data?.totalUsers?.toLocaleString() || '0'}</div>
                  <p className="text-xs text-muted-foreground">
                    Active platform users
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data?.activeSessions?.toLocaleString() || '0'}</div>
                  <p className="text-xs text-muted-foreground">
                    Current active sessions
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data?.storageUsed ? `${(data.storageUsed / 1024).toFixed(2)} TB` : '0 TB'}</div>
                  <p className="text-xs text-muted-foreground">
                    Total storage utilization
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">API Requests</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data?.apiRequests ? `${(data.apiRequests / 1000).toFixed(1)}K` : '0'}</div>
                  <p className="text-xs text-muted-foreground">
                    Requests per day
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Response Time</span>
                      <span className="text-sm text-muted-foreground">{data?.performance?.averageResponseTime || 0}ms</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressBarFill}
                        data-width={getProgressWidth(data?.performance?.averageResponseTime || 0, 500)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <span className="text-sm text-muted-foreground">{data?.performance?.cpuUsage || 0}%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressBarFill}
                        data-width={getProgressWidth(data?.performance?.cpuUsage || 0)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Memory Usage</span>
                      <span className="text-sm text-muted-foreground">{data?.performance?.memoryUsage || 0}%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressBarFill}
                        data-width={getProgressWidth(data?.performance?.memoryUsage || 0)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Network Traffic</span>
                      <span className="text-sm text-muted-foreground">{data?.performance?.networkTraffic || 0}%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressBarFill}
                        data-width={getProgressWidth(data?.performance?.networkTraffic || 0)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle>Recent Errors</CardTitle>
                  <CardDescription>System alerts and warnings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data?.errors.map((error) => (
                    <div key={error.id} className={styles.errorItem}>
                      <AlertTriangle 
                        className={`${styles.errorIcon} ${
                          error.level === "error" ? "text-red-500" : "text-yellow-500"
                        }`}
                      />
                      <div className={styles.errorContent}>
                        <p className={styles.errorMessage}>{error.message}</p>
                        <p className={styles.errorTimestamp}>
                          {new Date(error.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </Background>
  );
};

export default AnalyticsPage; 