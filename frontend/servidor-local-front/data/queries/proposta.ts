import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

interface ProposalType {
    id: string;
    title: string;
    description: string;
    user: {
        id: string;
        nome: string;
    };
    category: {
        id: string;
        nome: string;
        icone: string;
    };
    proposal: {
        id: string;
        horas: number;
        rate: number;
        urgency: boolean;
    };
    taxa: string;
}

const GET_ALL_PROPOSALS = gql`
    
`

export function getAllProposals() {
    const { loading, error, data } = useQuery<ProposalType[]>(GET_ALL_PROPOSALS);
    return { loading, error, data };
}