import { Usuario } from "./usuario";
import { viagem } from "./viagem";

export interface reserva {
  id: number | null;
  id_viagem: number | null;
  id_usuario: number | null;
  cod: number;
  forma_pagamento: string;
  criado_em: string;
  atualizado_em: string;
  viagem?: viagem;
  usuario?: Usuario;
}

export interface paginated_reservas {
  page: string;
  pages: string;
  items: reserva[];
}


export interface reserva_co {
  name: string,
  dependants: string[],
  fields: reserva
}