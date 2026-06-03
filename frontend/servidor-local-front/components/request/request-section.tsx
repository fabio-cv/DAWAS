"use client"

import { useState } from "react"
import { Hammer, Zap, Paintbrush, BrushCleaning, Send, Menu } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { parseCookies } from "nookies"

export const RequestSection = () => {
    const [description, setDescription] = useState("")
    const [selectedService, setSelectedService] = useState<number | null>(null)

    const [services, setServices] = useState([
        {
            id: 1,
            name: "Plumbing",
            urgent: false,
            icon: <Hammer className="text-[#1E73EA] w-5 h-5" />,
            bg: "bg-blue-100",
        },
        {
            id: 2,
            name: "Electrical",
            urgent: false,
            icon: <Zap className="text-[#D89B00] w-5 h-5" />,
            bg: "bg-yellow-100",
        },
        {
            id: 3,
            name: "Carpentry",
            urgent: false,
            icon: <Paintbrush className="text-[#E28B00] w-5 h-5" />,
            bg: "bg-orange-100",
        },
        {
            id: 4,
            name: "Cleaning",
            urgent: false,
            icon: <BrushCleaning className="text-[#00A99D] w-5 h-5" />,
            bg: "bg-cyan-100",
        }
    ])

    const toggleUrgent = (id: number) => {
        setServices(prev =>
            prev.map(service =>
                service.id === id
                    ? { ...service, urgent: !service.urgent }
                    : service
            )
        )
    }

    const handlerequest = async () => {
        try {
            const cookies = parseCookies()

            if (!cookies.user) {
                toast.error("Utilizador não autenticado")
                return
            }

            const user = JSON.parse(cookies.user)

            if (!selectedService) {
                toast.error("Selecione um serviço")
                return
            }

            const serviceSelected = services.find(
                service => service.id === selectedService
            )

            if (!serviceSelected) {
                toast.error("Serviço inválido")
                return
            }

            const orcamentoPayload = {
                total: "500",
                id_utilizadores: user.id,
                enabled: true
            }

        

            const orcamentoResponse = await fetch(
                "http://localhost:8080/orcamento/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${cookies.token}`
                    },
                    body: JSON.stringify(orcamentoPayload)
                }
            )

            if (orcamentoResponse.status !== 200) {
                toast.error("Erro ao criar orçamento")
                return
            }

            const orcamentoData = await orcamentoResponse.json()

            console.log({"dados do orçamento criado": orcamentoData})
            
            const payload = {
                designacao: description || serviceSelected.name,
                subtotal: "0",
                horas_estimadas: "0",
                id_servico: selectedService,
                preco_hora: "0",
                estado: "Pendente",
                id_orcamento: orcamentoData.data.id,
                id_prestador: null,
                enabled: true,
                urgente: serviceSelected.urgent,
                id_empresa: null,
                tipo_prestador: "particular"
            }

            const response = await fetch(
                "http://localhost:8080/prestacao-servico/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${cookies.token}`
                    },
                    body: JSON.stringify(payload)
                }
            )

            if (response.status === 200) {
                toast.success("Pedido enviado com sucesso")
                setDescription("")
                setSelectedService(null)
                setServices(prev =>
                    prev.map(service => ({ ...service, urgent: false }))
                )
            } else {
                toast.error("Erro ao enviar pedido")
            }

        } catch (error) {
            console.error(error)
            toast.error("Erro no servidor")
        }
    }

    return (
        <main className="max-w-5xl mx-auto py-16 px-5">
            {/* TITLE */}
            <div className="flex flex-col gap-3 mb-10">
                <h1 className="text-5xl font-bold text-[#0E1525]">
                    Public Service Request
                </h1>
                <p className="text-xl text-[#6B7A99]">
                    Select the service you need and submit your request.
                </p>
            </div>

            {/* TABLE */}
            <Card className="rounded-2xl border border-gray-200 shadow-none overflow-hidden">
                <CardContent className="p-0">
                    <div className="grid grid-cols-3 bg-[#F8FAFC] border-b border-gray-200 px-6 py-5">
                        <span className="font-bold text-[#23304A] text-lg">SELECT</span>
                        <span className="font-bold text-[#23304A] text-lg">SERVICE NAME</span>
                        <span className="font-bold text-[#23304A] text-lg text-center">URGENT?</span>
                    </div>

                    {/* CORREÇÃO AQUI: onValueChange e fallback para string vazia */}
                    <RadioGroup 
                        value={selectedService?.toString() ?? ""} 
                        onValueChange={(val) => setSelectedService(Number(val))}
                    >
                        {services.map((item) => (
                            <div
                                key={item.id}
                                className="grid grid-cols-3 items-center border-b border-gray-200 px-6 py-5"
                            >
                                {/* SELECT */}
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem
                                        value={item.id.toString()}
                                        id={`service-${item.id}`}
                                    />
                                    <Label htmlFor={`service-${item.id}`} className="cursor-pointer">
                                        Select
                                    </Label>
                                </div>

                                {/* SERVICE */}
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg}`}>
                                        {item.icon}
                                    </div>
                                    <span className="text-2xl text-[#0E1525]">
                                        {item.name}
                                    </span>
                                </div>

                                {/* URGENT */}
                                <div className="flex justify-center">
                                    <input
                                        type="checkbox"
                                        checked={item.urgent}
                                        onChange={() => toggleUrgent(item.id)}
                                        className="w-5 h-5 cursor-pointer"
                                    />
                                </div>
                            </div>
                        ))}
                    </RadioGroup>
                </CardContent>
            </Card>

            {/* DESCRIPTION */}
            <div className="mt-14 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                    <Menu className="w-5 h-5 text-[#52607A]" />
                    <span className="text-2xl font-bold text-[#0E1525]">
                        Service Description & Notes
                    </span>
                </div>
                <Textarea
                    placeholder="Please describe the issue in detail..."
                    className="min-h-[180px] resize-none text-lg p-5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <span className="text-[#6B7A99] flex items-center gap-2 text-sm">
                    ⓘ Detailed descriptions help provide more accurate requests.
                </span>
            </div>

            {/* BUTTON */}
            <div className="flex justify-end mt-20">
                <button
                    onClick={handlerequest}
                    className="bg-[#0D8CEB] hover:bg-[#0B7ED4] transition-all rounded-2xl px-12 py-5 text-white font-bold text-2xl flex items-center gap-3 shadow-lg shadow-blue-100"
                >
                    <Send className="w-6 h-6 text-white" />
                    Request Quotation
                </button>
            </div>
        </main>
    )
}