import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api, { type Produto } from "../../services/api";
 
export function ProdutoDetalhes() {
  // Captura o :id da rota /produtos/:id
  const { id } = useParams<{ id: string }>();
 
  // Busca o produto específico pelo id
  const { data: produto, isPending, isError, error } = useQuery({
    queryKey: ["produtos", id],
    queryFn: async () => {
      const resposta = await api.get<Produto>(`/produtos/${id}`);
      return resposta.data;
    },
  });
 
  if (isPending) return <p className="p-4">Carregando produto...</p>;
  if (isError) return <p className="p-4 text-red-600">Erro: {error.message}</p>;
  if (!produto) return <p className="p-4">Produto não encontrado.</p>;
 
  return (
    <div className="p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Produto</h1>
 
      <dl className="border rounded divide-y">
        <div className="p-2 flex justify-between">
          <dt className="font-semibold">ID</dt>
          <dd>{produto.id}</dd>
        </div>
        <div className="p-2 flex justify-between">
          <dt className="font-semibold">Descrição</dt>
          <dd>{produto.descricao}</dd>
        </div>
        <div className="p-2 flex justify-between">
          <dt className="font-semibold">Quantidade</dt>
          <dd>{produto.quantidade}</dd>
        </div>
        <div className="p-2 flex justify-between">
          <dt className="font-semibold">Valor</dt>
          <dd>R$ {produto.valor.toFixed(2)}</dd>
        </div>
      </dl>
 
      <div className="mt-4 flex gap-2">
        <Link
          to={`/produtos/editar/${produto.id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Editar
        </Link>
        <Link
          to="/produtos"
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Voltar para a listagem
        </Link>
      </div>
    </div>
  );
}
