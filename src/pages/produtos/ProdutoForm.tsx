import { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api, { type Produto } from "../../services/api";

export function ProdutoForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // useParams captura o :id da rota /produtos/editar/:id
  const { id } = useParams<{ id: string }>();
  const modoEdicao = Boolean(id); // sem id => modo criação
 
  // Estado controlado do formulário
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [valor, setValor] = useState(0);
 
  
  // useQuery carrega os dados existentes APENAS em modo edição
  const { data: produto } = useQuery({
    queryKey: ["produtos", id],
    queryFn: async () => {
      const resposta = await api.get<Produto>(`/produtos/${id}`);
      return resposta.data;
    },
    enabled: modoEdicao, // só executa quando existe um id na URL
  });
 
  // Preenche o formulário quando os dados chegam
  useEffect(() => {
    if (produto) {
      setDescricao(produto.descricao);
      setQuantidade(produto.quantidade);
      setValor(produto.valor);
    }
  }, [produto]);
 
  // Uma única mutation: decide entre PUT (edição) e POST (criação)
  const mutation = useMutation({
    mutationFn: async (dados: Omit<Produto, "id">) => {
      if (modoEdicao) {
          const resposta = await api.put<Produto>(`/produtos/${id}`,
             {...dados, id: Number(id) });
        return resposta.data;
        
      }
      const resposta = await api.post<Produto>("/produtos", dados);
      return resposta.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
      navigate("/produtos");
    },
    onError: (erro) => {
      alert(`Erro ao salvar o produto: ${erro.message}`);
    },
  });

  function handleSubmit(evento: React.FormEvent) {
    evento.preventDefault(); // impede o recarregamento da página
    mutation.mutate({ descricao, quantidade, valor });
  }
   return (
    <div className="p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Novo Produto</h1>
 
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col">
          Descrição
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </label>
 
        <label className="flex flex-col">
          Quantidade
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="border p-2 rounded"
            required
          />
        </label>
 
        <label className="flex flex-col">
          Valor
          <input
            type="number"
            step="0.01"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            className="border p-2 rounded"
            required
          />
        </label>
 
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50">
          {mutation.isPending ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}