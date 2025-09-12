"use client";
import DashboardContent from "@/components/HomeContent";
import { AuthProvider } from "@/lib/AuthContext";
import { usePathname } from "next/navigation";

import React from "react";

function Dashboard() {
  const pathname = usePathname();
  if (pathname=="/") {
    return (
      <AuthProvider>
        <DashboardContent />
      </AuthProvider>
    );
  }
}

export default Dashboard;
