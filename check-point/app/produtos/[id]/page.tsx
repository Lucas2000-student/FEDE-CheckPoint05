import DetalheProduto from "@/components/DetalheProduto";

export default function ProdutosPage({ params }: { params: { id: string } }) {
    return <DetalheProduto params={params} />
}
