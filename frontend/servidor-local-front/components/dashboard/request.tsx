"use client";

import { useState } from "react";
import { ArrowRight, Clock, DollarSign, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { useDashboardData } from "./dashboard-data-provider";
import type { ProposalType } from "./dashboard-data-provider";

interface RequestProps {
  title?: string;
}

export default function ProposalReview({ title }: RequestProps) {
  const [isReviewing, setIsReviewing] = useState(false);
  const { proposals } = useDashboardData();

  return (
    <div className="max-w-full mx-auto p-8 bg-white border border-gray-200 rounded-3xl shadow-sm font-sans">
      <div className="flex justify-between mb-6 ">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Active Proposals</h2>
        <Link className="text-sky-500  hover:text-sky-600 whitespace-nowrap items-center" href="">
          View All <ArrowRight className="ml-1 h-4 w-4 whitespace-nowrap" />
        </Link>
      </div>

      {proposals.length === 0 && (
        <p className="text-sm text-slate-600">No momento, nao existem propostas para este utilizador.</p>
      )}

      {proposals.map((item: ProposalType) => {
        const hours = parseFloat(item.horas_estimadas) || 0;
        const rate = parseFloat(item.preco_hora) || 0;
        const urgency = Boolean(item.urgente);
        const taxaUrgencia = Number(item.taxa_urgencia) || 0;
        const total = hours * rate;
        const finalTotal = urgency ? total * (1 + taxaUrgencia / 100) : total;

        return (
          <Card
            key={item.id}
            className={`overflow-hidden transition-all duration-300 ${
              isReviewing ? "ring-1 ring-blue-400 border-blue-200" : "border-slate-200"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{title ?? `Proposta #${item.id}`}</h3>
                    <p className="text-sm text-slate-500">
                      Estado: <span className="font-medium text-slate-700">{item.estado}</span> | Servico:{" "}
                      <span className="font-medium text-slate-700">{item.id_prestacao_servico}</span>
                    </p>
                  </div>
                </div>
                <Badge variant="default" className={item.estado === "aceite" ? "bg-green-500" : item.estado === "rejeitada" ? "bg-red-500" : item.estado === "pendente" ? "bg-yellow-500" : "bg-blue-500"}>
                    {item.estado}
                </Badge>
                {isReviewing ? (
                  <Button
                    onClick={() => setIsReviewing(false)}
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-3 py-1 font-bold"
                  >
                    Drafting
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsReviewing(true)}
                    variant="secondary"
                    className="bg-slate-100 hover:bg-slate-200 font-bold rounded-xl"
                  >
                    Review
                  </Button>
                )}
              </div>

              {isReviewing && (
                <div className="mt-8 pt-8 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-2 mb-6 text-slate-800 font-semibold uppercase text-xs tracking-wider">
                    <User className="h-4 w-4 text-slate-400" />
                    Proposal Details
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Est. Hours
                      </label>
                      <div className="bg-slate-50 border-slate-200 focus-visible:ring-blue-400 font-semibold rounded-full text-center">
                        {hours}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                        <DollarSign className="h-3 w-3" /> Rate ($/hr)
                      </label>
                      <div className="bg-slate-50 border-slate-200 focus-visible:ring-blue-400 font-semibold rounded-full text-center">
                        {rate}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pb-2">
                      <Checkbox
                        id={`urgency-${item.id}`}
                        checked={urgency}
                        disabled
                        className="border-slate-300 data-[state=checked]:bg-blue-600"
                      />
                      <label htmlFor={`urgency-${item.id}`} className="text-xs font-medium text-slate-600 leading-tight">
                        Urgency Fee ({taxaUrgencia || 15}%) <br />
                        <span className="text-blue-600 font-bold">{urgency ? "Applied" : "Not applied"}</span>
                      </label>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Total</p>
                      <p className="text-3xl font-black text-slate-900">
                        ${finalTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
