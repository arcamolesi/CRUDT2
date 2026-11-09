
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api, { type Produto } from "../../services/api";
 
 export function ProdutoList() {
    
  // useQuery: busca, cacheia e revalida os dados da API.
  // queryKey identifica a consulta no cache; queryFn executa a requisição.
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["produtos"],
    queryFn: async () => {
      const resposta = await api.get<Produto[]>("/produtos");
      return resposta.data;
    },
  });
  
    if (isPending) return <p className="p-4">Carregando produtos...</p>;
    if (isError) return <p className="p-4 text-red-600">Erro: {error.message}</p>;
 

 return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Link
          to="/produtos/novo"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Novo Produto
        </Link>
      </div>
 
      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Descrição</th>
            <th className="p-2 border">Quantidade</th>
            <th className="p-2 border">Valor</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((produto) => (
            <tr key={produto.id}>
              <td className="p-2 border">{produto.id}</td>
              <td className="p-2 border">{produto.descricao}</td>
              <td className="p-2 border">{produto.quantidade}</td>
              <td className="p-2 border">R${produto.valor.toFixed(2)}</td>
              <td className="p-2 border">
                <Link
                  to={`/produtos/${produto.id}`}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Detalhes
                </Link>
                <Link
                  to={`/produtos/editar/${produto.id}`}
                  className="text-yellow-600 hover:underline mr-2"
                >
                  Editar
                </Link>
                {/* O botão Remover será implementado na Etapa 7 */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  }
