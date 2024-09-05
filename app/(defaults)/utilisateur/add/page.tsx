import ComponentsAppsInvoiceAdd from "@/components/invoice/components-apps-invoice-add";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Ajouter un utilisateur",
};

const InvoiceAdd = () => {
  return <ComponentsAppsInvoiceAdd />;
};

export default InvoiceAdd;
