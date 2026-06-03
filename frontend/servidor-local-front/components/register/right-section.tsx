"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const RightSection = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: name,
        numero_identificacao: number,
        data_nascimento: birthDate,
        email,
        telefone: phone,
        pais: country,
        localidade: location,
        password,
        role: "cliente",
        enabled: true,
      }),
    });

    if (response.status !== 200) {
      toast.error("Could not create account. Please try again.");
      return;
    }

    toast.success("Account created successfully.");
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  return (
    <div className="w-1/2 flex flex-col justify-center">
      <Card className="h-full flex flex-col justify-center px-14 gap-10 py-6 my-4">
        <CardHeader>
          <span className="text-3xl font-bold">Create your account</span>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                className="py-2 h-10 text-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Identification Number</Label>
              <Input
                type="text"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
                placeholder="Identification number"
                className="py-2 h-10 text-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Date of Birth</Label>
              <Input
                type="text"
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
                placeholder="YYYY-MM-DD"
                className="py-2 h-10 text-lg"
              />
            </div>

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
              <Label>Phone</Label>
              <Input
                type="text"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Your phone number"
                className="py-2 h-10 text-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Country</Label>
              <Input
                type="text"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                placeholder="Your country"
                className="py-2 h-10 text-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Location</Label>
              <Input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Your city"
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
              onClick={handleRegister}
              className="bg-[#13A4EC] rounded-md text-white font-bold py-3 drop-shadow-lg drop-shadow-gray-200"
            >
              Register
            </Button>
          </div>

          <div className="mt-2">
            <span>Already have an account? </span>
            <Link href="/login" className="text-[#13A4EC] font-semibold">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
