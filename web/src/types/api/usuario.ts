import { reserva } from "./reserva";
import { viagem } from "./viagem";

export interface Usuario {
  id: number | null;
  nome: string;
  sobrenome: string;
  nome_usuario: string;
  senha?: string;
  email: string;
  admin: boolean;
  tipo: number;
  reservas?: reserva[];
  viagens?: viagem[]
  criado_em: string;
  atualizado_em?: string;
}


export interface paginated_usuarios {
  page: string;
  pages: string;
  items: Usuario[];
}


export interface usuario_co {
  name: string,
  dependants: string[],
  fields: Usuario
}