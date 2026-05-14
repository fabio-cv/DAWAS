import { Card, CardContent } from "../ui/card"

interface CategoriaType {
    id: string;
    nome: string;
    icone: string;
}

interface PedidoCardProps {
    title: string;
    description: string;
    image: string;
    category: CategoriaType;
}

export const PedidoCard = (pedidoCardProps: PedidoCardProps) => {
    return (
        <Card>
            <CardContent>
                <div></div>             
            </CardContent>

        </Card>
    )
}