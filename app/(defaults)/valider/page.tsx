import ComponentsDashboardAnalytics from "@/components/dashboard/components-dashboard-analytics";
import ComponentsDashboardValider from "@/components/dashboard/components-dashboard-valider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Validation",
};

const Analytics = () => {
  return <ComponentsDashboardValider />;
};

export default Analytics;
