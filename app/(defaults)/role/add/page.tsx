import ComponentsAppsInvoiceAdd from "@/components/invoice/components-apps-invoice-add";
import Role from "@/components/permission/role";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Ajouter un rôle",
};

const roleAdd = () => {
  return <Role />;
};

export default roleAdd;
