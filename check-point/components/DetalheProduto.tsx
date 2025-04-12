"use client"

import axios from "axios"
import { useEffect, useState } from "react"

interface Produto {
    id: number,
    title: string,
    price: number,
    images: string,
    description: string,
    category: string,
    rating: number
}

export default function DetalheProduto() {
    const [produtos, setProdutos] = useState<Produto[]>([])

    useEffect(() => {
        axios.get("https://dummyjson.com/products")
            .then(res => {
                const todos: Produto[] = res.data.products.map((p: any) => ({
                    id: p.id,
                    title: p.title,
                    price: p.price,
                    images: p.images,
                    description: p.description,
                    category: p.category,
                    rating: p.rating
                }))
                setProdutos(todos)
            })
            .catch(function () { console.error("Erro ao buscar API") })
    }, [])
    return (
        <ul>
            {produtos.map(prod => (
                <li key={prod.id}>
                    <div className="">
                        <img src={prod.images} alt={prod.title} width={200} />
                        <strong>Nome: </strong>{prod.title}
                        <p><strong>Preço: </strong>R$:{prod.price}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}