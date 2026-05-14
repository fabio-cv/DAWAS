"use client"

import { Label } from "../ui/label";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { setCookie } from "nookies";

export const RightSection = () => {

    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value){
            setEmail(e.target.value)
        }else{
            setEmail("")
        }

    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value){
            setPassword(e.target.value)
        }else{
            setPassword("")
        }
        
    }

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const response = await fetch(
            "http://localhost:8080/users/login",
            {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        )

        if(response.status === 200){
                toast.success("Utilizador loggado com sucesso")

                const responseData = await response.json()
                console.log({"dados recebidos": responseData});
                
                //se salvar dados na cookies
                setCookie(null, "token", responseData.data.token, {
                    maxAge: 30 * 24 * 60 * 60, 
                    path: "/"
                })

                setCookie(null, "user", JSON.stringify(responseData.data), {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/"
                })

                if(typeof window !== "undefined"){
                    window.location.href = "/home"
                }
            }else{
                toast.error("Não foi possível fazer login, tente novamente.")
            }
    }

    

    return(
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
                                type="text" 
                                placeholder="example@example.com" 
                                className="py-2 h-10 text-lg" 
                                value={email}
                                onChange={changeEmail}
                                />
                        </div>


                        <div className="flex flex-col gap-2">
                            <Label>Password</Label>
                            <Input 
                                type="password" 
                                placeholder="Your password" 
                                className="py-2 h-10 text-lg"
                                value={password}
                                onChange={changePassword}
                                />
                        </div>
                        <Button 
                        className="bg-[#13A4EC] rounded-md text-white font-bold py-3 drop-shadow-lg drop-shadow-gray-200"
                        onClick={handleLogin}
                        >
                        Login
                        </Button>
                    </div>

                    <div>
                        <span>Don`t have an account yet? </span>
                        <Link href="/registo" className="text-[#13A4EC] font-semibold">Create Account</Link>

                    </div>

                </CardContent>
                
            </Card>
            
        </div>
    )
};