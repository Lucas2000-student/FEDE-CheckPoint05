
export default function Footer() {
    return (
        <footer className="bg-green-800 text-white py-6 shadow-inner">
            <div className="max-w-4xl mx-auto text-center px-4">
                <h3 className="text-xl font-semibold">
                    Catálogo de Produtos &copy; {new Date().getFullYear()} — Todos os direitos reservados.
                </h3>
                {/* 
                    {new Date().getFullYear()}: insere o ano atual automaticamente
                */}
            </div>
        </footer>
    )
}