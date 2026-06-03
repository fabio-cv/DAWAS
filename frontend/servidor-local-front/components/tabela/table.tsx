"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";



export const RequestTable = () => {
    const [prestacaoServico, setPrestacaoServico] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/prestacao_servico/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                toast.success(
                    "Prestação de serviços buscada com sucesso!"
                );

                const data = await response.json();

                console.log(data);

                setPrestacaoServico(data.data);
            } else {
                toast.error(
                    "Erro ao buscar prestação de serviços!"
                );
            }
        } catch (error) {
            console.error(error);

            toast.error(
                "Erro ao conectar com o servidor!"
            );
        }
    };

    return (
        <div>
            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
                <span className="text-2xl font-bold">
                    Active Request
                </span>
            </div>

            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <table className="w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                    <thead>
                        <tr className="bg-slate-100 dark:bg-slate-900">
                            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                                Service Details
                            </th>

                            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                                Status
                            </th>

                            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                                Est.Price
                            </th>

                            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                                Dates
                            </th>

                            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Linha fixa */}
                        <tr className="border-t border-slate-200 dark:border-slate-700">
                            <td className="px-4 py-2">
                                <div className="text-black font-medium flex flex-col">
                                    <p>Leaking Pipe Repair</p>
                                    <span className="text-slate-500">plumbing</span>
                                </div>
                            </td>

                            <td className="px-4 py-2">
                                <span className="text-slate-500 font-medium">
                                    pending quotes
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-slate-500">
                                    waiting for estimates
                                </span>
                            </td>

                            <td className="px-4 py-2">
                                <span className="text-slate-500">
                                    Today
                                </span>
                            </td>

                            <td className="px-4 py-2">
                                <button className=" text-slate-500 hover:text-blue-500 flex items-center gap-2 cursor-pointer">
                                    View Request
                                    <ChevronRight />
                                </button>
                            </td>
                        </tr>

                        {/* Dados vindos da API */}
                        {prestacaoServico.map((item: any) => (
                            <tr
                                key={item.id}
                                className="border-t border-slate-200 dark:border-slate-700"
                            >
                                <td className="text-left px-4 py-2">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>
                                                CN
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex flex-col">
                                            <p className="font-bold">
                                                {item.disignacao}

                                            </p>

                                            <span className="text-slate-500">
                                                {item.disignacao}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                <td className="text-left px-4 py-2">
                                    <span
                                        className={`${item.estado === "pendente"
                                            ? "bg-orange-100 text-orange-500"
                                            : item.estado === "aceite"
                                                ? "bg-green-50 text-green-500"
                                                : "bg-red-50 text-red-500"
                                            } rounded-xl px-4 py-2 font-semibold text-sm inline-block`}
                                    >
                                        {item.estado}
                                    </span>
                                </td>

                                <td className="text-left px-4 py-2">
                                    <p className="text-slate-500">
                                        {item.subtotal}
                                    </p>
                                </td>

                                <td className="text-left px-4 py-2">
                                    <span className="text-slate-500">
                                        Req: Today{" "}
                                        {item.created_at || item.updated_at}
                                    </span>
                                </td>

                                <td className="text-left px-4 py-2">
                                    <Button className="bg-blue-600 text-white hover:bg-blue-500 opacity-90 cursor-pointer font-semibold rounded-xl px-4 py-2 h-auto">
                                        Review quote
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
