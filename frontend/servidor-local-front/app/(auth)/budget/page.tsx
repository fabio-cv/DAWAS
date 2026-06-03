"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Clock, Handshake, MessageCircle, Search, X } from "lucide-react";

import Navbar from "@/components/core/navbar";
import { Footer } from "@/components/budget/footer";
import { SearchIcon } from "@/assets/icons/search";

type ProposalStatus = "accepted" | "pending" | "cancelled";

type Proposal = {
    id: string;
    provider: string;
    avatar: string;
    rating?: string;
    status: ProposalStatus;
    items: {
        label: string;
        value: number;
    }[];
    note?: string;
};

const initialProposals: Proposal[] = [
    {
        id: "maria-silva",
        provider: "Maria Silva",
        avatar: "MS",
        rating: "4.8 (124)",
        status: "accepted",
        items: [
            { label: "Labor (6h x EUR25/h)", value: 150 },
            { label: "Specialized Equipment", value: 45 },
            { label: "Eco-friendly Supplies", value: 30 },
        ],
    },
    {
        id: "elite-cleaning",
        provider: "Elite Cleaning Co.",
        avatar: "EC",
        rating: "4.2 (89)",
        status: "pending",
        items: [
            { label: "Flat Rate Service", value: 280 },
            { label: "Travel Fee", value: 20 },
        ],
    },
    {
        id: "quick-scrub",
        provider: "Quick Scrub S.A.",
        avatar: "QS",
        status: "cancelled",
        note: "Withdrew proposal",
        items: [{ label: "Original proposal", value: 190 }],
    },
];

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IE", {
        style: "currency",
        currency: "EUR",
    }).format(value);

const statusConfig = {
    accepted: {
        label: "Aceite",
        badgeClass: "bg-[#13a4ec] text-white",
        icon: Check,
    },
    pending: {
        label: "Pendente",
        badgeClass: "bg-[#fef3c7] text-[#92400e]",
        icon: Clock,
    },
    cancelled: {
        label: "Cancelado",
        badgeClass: "bg-[#cbd5e1] text-[#475569]",
        icon: X,
    },
};

function ProposalCard({
    proposal,
    isSelected,
    onSelect,
}: {
    proposal: Proposal;
    isSelected: boolean;
    onSelect: () => void;
}) {
    const total = proposal.items.reduce((sum, item) => sum + item.value, 0);
    const status = statusConfig[proposal.status];
    const StatusIcon = status.icon;
    const isCancelled = proposal.status === "cancelled";

    return (
        <button
            type="button"
            onClick={onSelect}
            aria-pressed={isSelected}
            className={`w-full text-left rounded-xl border p-5 relative overflow-hidden transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13a4ec] ${
                isSelected
                    ? "bg-white border-2 border-[#13a4ec] shadow-sm"
                    : "bg-white border-slate-200 hover:border-[#13a4ec]/60 hover:shadow-sm"
            } ${isCancelled ? "bg-[#f8fafc] opacity-70" : ""}`}
        >
            <div
                className={`absolute top-0 right-0 ${status.badgeClass} px-3 py-1 rounded-bl-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1`}
            >
                <StatusIcon className="size-3" />
                {status.label}
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex items-center gap-4 min-w-[180px]">
                    <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold ${
                            isSelected
                                ? "bg-[#d6effd] text-[#001e30] border-2 border-[#13a4ec]"
                                : "bg-slate-100 text-[#475569]"
                        }`}
                    >
                        {proposal.avatar}
                    </div>
                    <div>
                        <p
                            className={`font-bold text-sm ${
                                isCancelled ? "text-[#475569]" : "text-[#0f172a]"
                            }`}
                        >
                            {proposal.provider}
                        </p>
                        {proposal.rating ? (
                            <div className="flex items-center gap-0.5 text-[#f59e0b] text-xs mt-0.5">
                                {"★★★★☆"}
                                <span className="text-[#475569] ml-1 font-medium">
                                    {proposal.rating}
                                </span>
                            </div>
                        ) : (
                            <span className="text-xs text-[#475569] block mt-1">
                                {proposal.note}
                            </span>
                        )}
                    </div>
                </div>

                <div
                    className={`flex-grow flex flex-col sm:flex-row gap-6 justify-between border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 w-full ${
                        isCancelled ? "opacity-80" : ""
                    }`}
                >
                    <div className="space-y-1.5 flex-grow text-sm">
                        {proposal.items.map((item) => (
                            <div className="flex justify-between gap-4" key={item.label}>
                                <span className="text-[#475569]">{item.label}</span>
                                <span className="font-medium text-[#0f172a]">
                                    {formatCurrency(item.value)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-end justify-center min-w-[100px]">
                        <span
                            className={`font-bold ${
                                isCancelled
                                    ? "text-base text-[#475569] line-through"
                                    : isSelected
                                      ? "text-2xl text-[#13a4ec]"
                                      : "text-xl text-[#0f172a]"
                            }`}
                        >
                            {formatCurrency(total)}
                        </span>
                        {!isCancelled && (
                            <span className="text-xs text-[#475569] mt-1">
                                Includes VAT
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </button>
    );
}

export function BudgetPage() {
    const [proposals, setProposals] = useState(initialProposals);
    const [selectedProposalId, setSelectedProposalId] = useState(initialProposals[0].id);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const selectedProposal =
        proposals.find((proposal) => proposal.id === selectedProposalId) ??
        proposals[0];

    const subtotal = useMemo(
        () => selectedProposal.items.reduce((sum, item) => sum + item.value, 0),
        [selectedProposal]
    );
    const platformFee = selectedProposal.status === "cancelled" ? 0 : subtotal * 0.05;
    const totalDue = subtotal + platformFee;
    const selectedStatus = statusConfig[selectedProposal.status];

    const handleAcceptProposal = () => {
        setProposals((currentProposals) =>
            currentProposals.map((proposal) =>
                proposal.id === selectedProposalId
                    ? { ...proposal, status: "accepted" }
                    : proposal
            )
        );
    };

    return (
        <div className="bg-[#f6f7f8] text-[#0f172a] min-h-screen flex flex-col">
            <header>
                <Navbar>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            {isSearchOpen && (
                                <input
                                    type="search"
                                    value={searchValue}
                                    onChange={(event) => setSearchValue(event.target.value)}
                                    autoFocus
                                    placeholder="Pesquisar..."
                                    className="h-9 w-40 sm:w-56 rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#0f172a] outline-none transition focus:border-[#13a4ec] focus:ring-2 focus:ring-[#13a4ec]/20"
                                />
                            )}
                            <button
                                type="button"
                                onClick={() => setIsSearchOpen((isOpen) => !isOpen)}
                                aria-label={isSearchOpen ? "Fechar pesquisa" : "Abrir pesquisa"}
                                className="flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-[#d6effd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13a4ec]"
                            >
                                <SearchIcon />
                            </button>
                        </div>
                        <div className="text-[#13a4ec] font-semibold p-2 rounded-sm">
                            <Link href="/registro">Sign in</Link>
                        </div>
                        <div className="bg-[#13a4ec] text-white px-4 py-2 rounded-lg text-sm font-medium">
                            Join as Provider
                        </div>
                    </div>
                </Navbar>
            </header>

            <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 py-10 md:px-12 flex flex-col gap-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0f172a] mb-2">
                            Deep Clean & Sanitization
                        </h1>
                        <p className="text-[#475569] text-base">
                            Requested on October 12, 2024 for a 4-bedroom residential
                            property in Downtown.
                        </p>
                    </div>
                    <div className="bg-[#f8fafc] px-6 py-4 rounded-xl flex flex-col items-end border border-slate-200/60 shrink-0">
                        <span className="text-[11px] uppercase tracking-widest font-bold text-[#475569] mb-1">
                            Total Estimated Value
                        </span>
                        <div className="text-3xl font-extrabold text-[#0f172a]">
                            {formatCurrency(450)}
                        </div>
                        <span className="text-xs text-[#13a4ec] font-medium mt-1">
                            Pending Approval
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        <section className="bg-white rounded-2xl shadow-sm border border-slate-200/50 overflow-hidden">
                            <div className="px-8 py-5 bg-[#f8fafc] border-b border-slate-200/50 flex justify-between items-center">
                                <h2 className="text-base font-bold text-[#0f172a] flex items-center gap-2">
                                    <Search className="size-4 text-[#13a4ec]" />
                                    Provider Proposals
                                </h2>
                                <span className="bg-[#d6effd] text-[#001e30] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {proposals.length} Received
                                </span>
                            </div>

                            <div className="p-6 flex flex-col gap-4">
                                {proposals.map((proposal) => (
                                    <ProposalCard
                                        key={proposal.id}
                                        proposal={proposal}
                                        isSelected={proposal.id === selectedProposal.id}
                                        onSelect={() => setSelectedProposalId(proposal.id)}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50 p-6 flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#13a4ec] to-[#cae6ff]" />

                            <h3 className="text-base font-bold text-[#0f172a] mb-4">
                                Captar proposta
                            </h3>
                            <p className="text-sm text-[#475569] mb-6 leading-relaxed">
                                Voce selecionou a proposta de{" "}
                                <strong className="text-[#0f172a]">
                                    {selectedProposal.provider}
                                </strong>
                                . Revise os termos finais antes de avancar.
                            </p>

                            <div className="flex items-center justify-between mb-5 rounded-lg bg-[#f8fafc] border border-slate-200 px-4 py-3">
                                <span className="text-sm font-medium text-[#475569]">
                                    Estado
                                </span>
                                <span
                                    className={`${selectedStatus.badgeClass} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}
                                >
                                    {selectedStatus.label}
                                </span>
                            </div>

                            <div className="space-y-3 mb-6">
                                {selectedProposal.items.map((item) => (
                                    <div
                                        className="flex justify-between items-center gap-4 text-sm"
                                        key={item.label}
                                    >
                                        <span className="text-[#475569]">{item.label}</span>
                                        <span className="font-medium text-[#0f172a]">
                                            {formatCurrency(item.value)}
                                        </span>
                                    </div>
                                ))}
                                <div className="h-px w-full bg-slate-200 my-1" />
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#475569]">Subtotal</span>
                                    <span className="font-medium text-[#0f172a]">
                                        {formatCurrency(subtotal)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#475569]">Platform Fee (5%)</span>
                                    <span className="font-medium text-[#0f172a]">
                                        {formatCurrency(platformFee)}
                                    </span>
                                </div>
                                <div className="h-px w-full bg-slate-200 my-1" />
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-[#0f172a]">Total Due</span>
                                    <span className="text-xl font-extrabold text-[#13a4ec]">
                                        {formatCurrency(totalDue)}
                                    </span>
                                </div>
                            </div>

                            <button
                                className="w-full bg-[#13a4ec] text-white py-3.5 rounded-lg font-bold shadow-sm hover:bg-sky-500 active:scale-95 transition-all flex items-center justify-center gap-2 mb-3 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:active:scale-100"
                                onClick={handleAcceptProposal}
                                disabled={selectedProposal.status === "cancelled"}
                            >
                                <Handshake className="size-4" />
                                {selectedProposal.status === "accepted"
                                    ? "Proposta aceite"
                                    : "Accept & Pay Securely"}
                            </button>
                            <button className="w-full bg-slate-100 text-[#475569] py-3 rounded-lg font-medium text-sm hover:bg-slate-200 active:scale-95 transition-colors">
                                Request Modifications
                            </button>
                        </div>

                        <div className="bg-[#d6effd]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#13a4ec]/10 flex items-start gap-4">
                            <MessageCircle className="size-6 text-[#13a4ec] shrink-0" />
                            <div>
                                <h4 className="font-bold text-[#001e30] text-sm mb-1">
                                    Need help deciding?
                                </h4>
                                <p className="text-xs text-[#001e30]/70 mb-3">
                                    Our concierge team is available to help you evaluate these
                                    proposals.
                                </p>
                                <a
                                    className="text-xs font-bold text-[#13a4ec] hover:underline uppercase tracking-wide"
                                    href="#"
                                >
                                    Contact Concierge
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default BudgetPage;