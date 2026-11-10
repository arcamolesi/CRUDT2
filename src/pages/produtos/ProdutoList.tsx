
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api, { type Produto } from "../../services/api";
import { Eye, Pencil, Trash2 } from "lucide-react";
 
 export function ProdutoList() {
    
    const queryClient = useQueryClient();


  // useQuery: busca, cacheia e revalida os dados da API.
  // queryKey identifica a consulta no cache; queryFn executa a requisição.
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["produtos"],
    queryFn: async () => {
      const resposta = await api.get<Produto[]>("/produtos");
      return resposta.data;
    },
  });

      // Mutation para a operação DELETE
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/produtos/${id}`);
    },
    onSuccess: () => {
      // Invalida a consulta: a lista é atualizada automaticamente,
      // sem precisar recarregar a página.
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
    },
    onError: (erro) => {
      alert(`Erro ao remover o produto: ${erro.message}`);
    },
  });
 
  // Função chamada pelo botão Remover, com confirmação do usuário
  function handleDelete(produto: Produto) {
    if (window.confirm(`Deseja realmente remover o produto "${produto.descricao}"?`)) {
      deleteMutation.mutate(produto.id);
    }
  }

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
                <div className="flex items-center gap-4">
                <Link
                  to={`/produtos/${produto.id}`}
                  className="text-blue-600 hover:underline mr-2"
                >
                   <Eye size={20} />
                </Link>
                <Link
                  to={`/produtos/editar/${produto.id}`}
                  className="text-yellow-600 hover:underline mr-2"
                >
                  <Pencil size={20} />
                </Link>
                <button
                onClick={() => handleDelete(produto)}
                disabled={deleteMutation.isPending}
                className="text-red-600 hover:underline disabled:opacity-50"
              >
                <Trash2 size={20} />
              </button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  }
