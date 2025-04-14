import axios from "axios"
import Link from "next/link"

// Interface com os detalhes completos de um produto
interface Produto {
    id: number,
    title: string,
    price: number,
    images: string[],
    description: string,
    category: string,
    rating: number
}

// Componente que renderiza a página de detalhes do produto
export default async function DetalheProduto({ params }: { params: { id: string } }) {
    // Faz uma requisição à API para obter todos os produtos
    const res = await axios.get("https://dummyjson.com/products")
    const produtos = res.data.products.map((products: any) => products)

    const idBuscado = Number(params.id) // Converte o id da URL para número
    const produtoEncontrado = produtos.find((item: any) => item.id === idBuscado)
    const produto: Produto | undefined = produtoEncontrado // Garante o tipo correto

    // Se o produto não for encontrado, mostra mensagem de erro
    if (!produto) {
        return <p className="text-center text-red-600 mt-10">Produto não encontrado</p> 
    }

    // Exibe os detalhes do produto encontrado
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
            <div className="absolute top-4 left-4">
                {/* Link para voltar à página inicial */}
                <Link href="/" className="bg-green-600 hover:bg-white text-black py-2 px-4 rounded">Início</Link>
            </div>
            <img
                src={Array.isArray(produto.images) ? produto.images[0] : produto.images} // Modo para pegar as imagens nessa API
                alt={produto.title}
                className="w-80 h-80 object-cover rounded shadow-lg mb-6"
            />
            <ul className="bg-white p-6 rounded shadow-md w-full max-w-xl">
                <li><strong className="text-green-800">Nome: </strong>{produto.title}</li>
                <li><strong className="text-green-800">Preço: </strong>R$ {produto.price}</li>
                <li><strong className="text-green-800">Categoria: </strong>{produto.category}</li>
                <li><strong className="text-green-800">Nota: </strong>{produto.rating}</li>
            </ul>
            <p className="mt-6 text-center text-lg font-semibold text-green-900 max-w-xl">
                {produto.description}
            </p>
        </div>
    )
}
