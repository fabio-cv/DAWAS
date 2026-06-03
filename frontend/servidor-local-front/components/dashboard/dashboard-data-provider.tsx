"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { parseCookies } from "nookies";

export interface RatesApiData {
  preco_hora?: number | string;
  taxa_urgencia?: number | string;
  percentagem_desconto?: number | string;
}

export interface ProposalType {
  id: string;
  id_prestacao_servico: string;
  preco_hora: string;
  horas_estimadas: string;
  estado: string;
  enabled: boolean;
  id_prestador: string;
  urgente: boolean;
  taxa_urgencia: number;
}

interface RatesApiResponse {
  status: "success" | "error";
  message: string;
  data: RatesApiData | null;
}

interface ProposalApiResponse {
  status: "success" | "error";
  message: string;
  data: ProposalType[] | null;
}

interface DashboardDataContextType {
  rates: RatesApiData | null;
  proposals: ProposalType[];
  loading: boolean;
}

const DashboardDataContext = createContext<DashboardDataContextType>({
  rates: null,
  proposals: [],
  loading: true,
});

async function getRatesByUserId(id: string, token: string): Promise<RatesApiData | null> {
  const response = await fetch(`http://localhost:8080/prestador/get-preco-hora/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) return null;
  const payload: RatesApiResponse = await response.json();
  return payload.data ?? null;
}

async function getProposal(idUser: string, token: string): Promise<ProposalType[]> {
  const response = await fetch(`http://localhost:8080/proposal/get-by-user-id/${idUser}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) return [];
  const payload: ProposalApiResponse = await response.json();
  return payload.data ?? [];
}

export function DashboardDataProvider({ children }: { children: React.ReactNode }) {
  const [rates, setRates] = useState<RatesApiData | null>(null);
  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const { token, user } = parseCookies();
      if (!token || !user) {
        setLoading(false);
        return;
      }

      let parsedUser: { id?: string } = {};
      try {
        parsedUser = JSON.parse(user);
      } catch {
        setLoading(false);
        return;
      }

      if (!parsedUser.id) {
        setLoading(false);
        return;
      }

      const [ratesData, proposalData] = await Promise.all([
        getRatesByUserId(parsedUser.id, token),
        getProposal(parsedUser.id, token),
      ]);

      setRates(ratesData);
      setProposals(proposalData);
      setLoading(false);
    };

    void run();
  }, []);

  const value = useMemo(
    () => ({
      rates,
      proposals,
      loading,
    }),
    [rates, proposals, loading]
  );

  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData() {
  return useContext(DashboardDataContext);
}
