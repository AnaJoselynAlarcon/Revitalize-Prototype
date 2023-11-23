"use client";
import Image from "next/image";
import LoginForm from "./components/login";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-5xl font-bold text-center text-gray-800">
          Revitalize
        </h1>
        <p className="text-center text-gray-600">A starter template</p>
        <LoginForm />
      </div>
    </main>
  );
}
