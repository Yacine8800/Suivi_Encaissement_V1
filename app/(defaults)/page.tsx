import BoxedSignIn from "@/app/(auth)/login/page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: " CONNEXION",
};

const Sales = () => {
  return <BoxedSignIn />;
};

export default Sales;
