import ComponentsDashboardAnalytics from "@/components/dashboard/parent-encaissement";
import DetailEncaissmentvalider from "@/components/datatables/detail-encaissement-validate";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Détail",
};

const View = () => {
  return <DetailEncaissmentvalider />;
};

export default View;
