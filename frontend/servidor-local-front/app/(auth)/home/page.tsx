import { PedidoCard } from "@/components/core/pedido-card";

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <PedidoCard
        title="Pedido 1"
        description="Descrição do pedido 1"
        image="https://via.placeholder.com/150"
        category={{ id: "1", nome: "Categoria 1", icone: "https://via.placeholder.com/50" }}
      
      />
    </div>
  );
}
