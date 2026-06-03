"use client";

import Link from "next/link";
import { useState } from "react";
import { setCookie } from "nookies";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const RightSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.status !== 200) {
      toast.error("Email or password is invalid.");
      return;
    }

    const responseData = await response.json();

    setCookie(null, "token", responseData?.data?.token ?? "", {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    setCookie(null, "user", JSON.stringify(responseData?.data?.user ?? {}), {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    toast.success("Login successful.");
    if (typeof window !== "undefined") {
      window.location.href = "/home";
    }
  };

  return (
    <div className="w-1/2 flex flex-col justify-center">
      <Card className="h-full flex flex-col justify-center px-14 gap-16">
        <CardHeader className="text-5xl font-bold">
          <span>Login</span>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="example@example.com"
                className="py-2 h-10 text-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
                className="py-2 h-10 text-lg"
              />
            </div>

            <Button
              onClick={handleLogin}
              className="bg-[#13A4EC] rounded-md text-white font-bold py-3 drop-shadow-lg drop-shadow-gray-200"
            >
              Login
            </Button>
          </div>

          <div>
            <span>Don&apos;t have an account yet? </span>
            <Link href="/register" className="text-[#13A4EC] font-semibold">
              Create Account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
