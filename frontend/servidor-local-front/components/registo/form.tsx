"use client"

import { Label } from "../ui/label";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";


export const RegistoForm = () => {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [numeroIdentificacao, setNumeroIdentificao] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [telefone, setTelefone] = useState("")
    const [pais, setPais] = useState("")
    const [localidade, setLocalidade] = useState("")
    const [password, setPassword] = useState("")

    const changeNome = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value){
            setNome(e.target.value)
        } else setNome("") }

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value){
            setEmail(e.target.value)
        } else setEmail("")  }

    const changeNumeroIdentificacao = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value){
            setNumeroIdentificao(e.target.value)
        } else setNumeroIdentificao("") }

        const changeDataNascimento = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value){
            setDataNascimento(e.target.value)
        } else setDataNascimento("") }

        const changeTelefone = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value){
            setTelefone(e.target.value)
        } else setTelefone("") }

        const changePais = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value){
            setPais(e.target.value)
        } else setPais("") }

        const changeLocalidade = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value){
            setLocalidade(e.target.value)
        } else setLocalidade("") }

        const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value){
            setPassword(e.target.value)
        } else setDataNascimento("") }

        const handleRegisto = async() => {


            const response = await fetch("http://localhost:8080/users/create",
                {
                    method: "POST",
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nome: nome,
                        numero_identificacao: numeroIdentificacao,
                        data_nascimento: dataNascimento,
                        email: email,
                        telefone: telefone,
                        pais: pais,
                        localidade: localidade,
                        password: password,
                        role: "cliente",
                        enabled: true
                    })
                }
            )

            if(response.status === 201){
                toast.success("Utilizador criado com sucesso")
                if(typeof window !== "undefined"){
                    window.location.href = "/login"
                }
            }else{
                toast.error("Não foi possível criar conta, tente novamente.")
            }

        }

        return (
            <div className="w-1/2 flex flex-col justify-center">
            <Card className="h-full flex flex-col justify-center px-14 gap-16">
                <CardHeader className="text-5xl font-bold">
                    <span>Register</span>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col gap-5">

                        <div className="flex flex-col gap-2">
                            <Label>Nome</Label>
                            <Input 
                                type="text" 
                                placeholder="Nome completo" 
                                className="py-2 h-10 text-lg" 
                                value={nome}
                                onChange={changeNome}
                                />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Email</Label>
                            <Input 
                                type="email" 
                                placeholder="example@example.com" 
                                className="py-2 h-10 text-lg" 
                                value={email}
                                onChange={changeEmail}
                                />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Número de identificação</Label>
                            <Input 
                                type="text" 
                                placeholder="Número de identificação" 
                                className="py-2 h-10 text-lg" 
                                value={numeroIdentificacao}
                                onChange={changeNumeroIdentificacao}
                                />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Data de nascimento</Label>
                            <Input 
                                type="text" 
                                placeholder="Data de nascimento" 
                                className="py-2 h-10 text-lg" 
                                value={dataNascimento}
                                onChange={changeDataNascimento}
                                />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Telefone</Label>
                            <Input 
                                type="number" 
                                placeholder="telefone" 
                                className="py-2 h-10 text-lg" 
                                value={telefone}
                                onChange={changeTelefone}
                                />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Pais</Label>
                            <Input 
                                type="text" 
                                placeholder="Pais residente" 
                                className="py-2 h-10 text-lg" 
                                value={pais}
                                onChange={changePais}
                                />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Localidade</Label>
                            <Input 
                                type="text" 
                                placeholder="Localidade" 
                                className="py-2 h-10 text-lg" 
                                value={localidade}
                                onChange={changeLocalidade}
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
                        onClick={handleRegisto}
                        >
                        Registar
                        </Button>
                    </div>

                    <div>
                        <span>Do you already have an account? </span>
                        <Link href="/login" className="text-[#13A4EC] font-semibold">Login</Link>

                    </div>

                </CardContent>
                
            </Card>
            
        </div>
        )

}