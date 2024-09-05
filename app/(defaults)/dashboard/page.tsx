import ComponentsDashboardSales from "@/components/dashboard/components-dashboard-sales";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tableau de bord",
};

const Analytics = () => {
  return <ComponentsDashboardSales />;
};

export default Analytics;
