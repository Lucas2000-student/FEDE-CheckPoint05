"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

// Define a interface para representar os produtos retornados da API
interface Produto {
    id: number,
    title: string,
    price: number,
    images: string[]
}

export default function CardProduto() {
    // Cria um estado para armazenar os produtos
    const [produtos, setProdutos] = useState<Produto[]>([])

    // useEffect roda uma vez ao montar o componente, para buscar os produtos da API
    useEffect(() => {
        axios.get("https://dummyjson.com/products")
            .then(res => {
                // Mapeia os dados recebidos da API para o formato esperado pela interface Produto
                const todos: Produto[] = res.data.products.map((p: any) => ({
                    id: p.id,
                    title: p.title,
                    price: p.price,
                    images: p.images
                }))
                setProdutos(todos) // Atualiza o estado com os produtos recebidos
            })
            .catch(() => console.error("Erro ao buscar API")) // Trata erro na requisição
    }, [])

    // Renderiza a lista de produtos como cards
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-green-100">
            {produtos.map(prod => (
                <li key={prod.id}>
                    <div className="flex items-center border border-black p-4 rounded bg-white shadow-md">
                        <img
                            src={Array.isArray(prod.images) ? prod.images[0] : prod.images} // Modo para pegar as imagens nessa API
                            alt={prod.title}
                            className="w-32 h-32 object-cover mr-4"
                        />
                        <div>
                            <strong className="text-green-800">Nome: </strong>
                            {/* Link dinâmico para a página de detalhes do produto */}
                            <Link href={`/produtos/${prod.id}`} className="text-green-600 hover:underline">
                                {prod.title}
                            </Link>
                            <p>
                                <strong className="text-green-800">Preço: </strong>
                                R$ {prod.price}
                            </p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
