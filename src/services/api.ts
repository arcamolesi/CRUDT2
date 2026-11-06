import axios from 'axios';
 
// Cliente axios centralizado: a URL da API fica definida em um único lugar.
// Ajuste a porta conforme a que sua API está usando (veja o terminal do backend).
const api = axios.create({
  baseURL: 'http://localhost:5286/api',
});
 
// Tipagem do Produto (espelha o modelo do backend)
export interface Produto {
  id: number;
  descricao: string;
  quantidade: number;
  valor: number;
}
 
export default api
