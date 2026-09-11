"use server";

import { createSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!password || password !== adminPassword) {
    return { error: "Invalid password" };
  }

  await createSession();
  redirect("/dashboard");
}
