import BoxedSignIn from "@/app/(auth)/login/page";
import { Metadata } from "next";
import React from "react";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: " CONNEXION",
};


const Sales = () => {
  redirect('/login');
  return <BoxedSignIn />;
};

export default Sales;
