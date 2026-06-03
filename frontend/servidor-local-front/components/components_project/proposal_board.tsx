"use client"

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

interface PropostaRequest{
    id: string,
    owner: string,
    estado: string,
    id_prestacao_servico:{
        id_servico:{
            nome: string,
            categoria:{
                id: string
                icone: string
            }
        }
    }
}

export const Proposal_Board = (propostaRequest: PropostaRequest) => {
    return(
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Active Proposals
                    </h2>
                    <button className="flex item-center gap-1 text-sm font-medium text-sky-500 hover:text-sky-600">
                        View All
                        <span>→</span>
                    </button>
                </div>
            </CardHeader>

            <CardContent>
           
                <div className="border-gray-200 px-6 py-6 flex gap-6 flex-col">

                    <div className="flex gap-4 min-w-[250px]">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-100">
                        <span className="text-2xl">{propostaRequest.id_prestacao_servico.id_servico.categoria.icone}</span>
                    </div>

                    <div className="flex items-center justify-between w-full">
                    
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 leading-none">
                            {propostaRequest.id_prestacao_servico.id_servico.nome}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                            {propostaRequest.owner}
                            </p>
                        </div>

                        <span className="ml-4 rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                            {propostaRequest.estado}
                        </span>

                    </div>

                    </div>
                    
                    <div className="flex-1">

                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                        <div className="flex items-center gap-2 mb-4">
                        <span className="text-sky-500">{propostaRequest.id_prestacao_servico.id_servico.categoria.icone}</span>
                        <h4 className="font-semibold text-gray-900">
                            Proposal Editor
                        </h4>
                        </div>

                        <div className="flex flex-wrap items-end gap-6">

                            <div>
                                <Label className="text-xs text-gray-500">
                                EST. HOURS
                                </Label>
                                <Input
                                type="number"
                                defaultValue="0.0"
                                className="w-28 mt-1"
                                />
                            </div>

                            <div>
                                <Label className="text-xs text-gray-500">
                                RATE ($/hr)
                                </Label>
                                <Input
                                type="number"
                                defaultValue="00"
                                className="w-28 mt-1"
                                />
                            </div>

                            <div>
                                <Label className="text-xs text-gray-500">
                                URGENCY (+15%)
                                </Label>

                                <div className="flex items-center gap-2 mt-2">
                                <Input type="checkbox" className="h-4 w-4" />
                                <span className="text-sm text-gray-600">Apply</span>
                                </div>
                            </div>

                            <div className="ml-auto text-right">
                                <p className="text-xs text-gray-500">TOTAL</p>
                                <h2 className="text-2xl font-bold">$143.75</h2>
                            </div>
                        </div>
                        
                        <div className="flex justify-end gap-4 mt-6">
                            <button className="text-sm font-medium text-gray-600">
                                Save Draft
                            </button>

                            <button className="rounded-lg bg-sky-500 px-5 py-2 text-white font-semibold hover:bg-sky-600">
                                Send Proposal
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                    <div className="flex items-center justify-between w-full gap-6 border-b border-gray-200 px-6 py-6">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-100"> 
                            <span className="text-2xl">{propostaRequest.id_prestacao_servico.id_servico.categoria.icone}</span>
                        </div>
                        
                        <div >
                            <h3 className="text-xl font-semibold text-gray-900"> {propostaRequest.id_prestacao_servico.id_servico.nome}</h3>
                            <p className="mt-1 text-sm text-gray-500">{propostaRequest.owner}</p>
                        </div>

                        <div className="flex items-center justify-end gap-4">
                                <button className="text-lg font-semibold text-gray-700 hover:text-gray-900">New Request</button>
                                <button className="rounded-xl bg-sky-500 px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-sky-600">Create Proposal</button>
                        </div>
                    </div>
  
            </CardFooter>
        </Card>
    )
};