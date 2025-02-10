"use server";

import { UserData } from "@/app/register/page";

export const registerUser = async (data : UserData) => {
  console.log(process.env.BACKEND_URL)

  const res = await fetch(`${process.env.BACKEND_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  const userInfo = await res.json();
  return userInfo;
};
