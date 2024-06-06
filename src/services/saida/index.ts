import api from "../api";
import Cookies from "js-cookie";

export interface SaidaIn {
  sai_observacao?: string;
  pes_id: number;
  itensSaida: ItensSaidaIn[];
}

export interface ItensSaidaIn {
  pro_id: number;
  itens_sai_quantidade: number;
}

export interface SaidaOut {
  sai_id: number;
  sai_data_registro: string;
  sai_observacao: string;
  itens_saida: ItensSaidaOut[];
  pessoa: PessoaOut;
  usuario: UsuarioOut;
}

export interface ItensSaidaOut {
  pro_id: number;
  itens_sai_quantidade: number;
  produto: ProdutoOut;
}

export interface PessoaOut {
  pes_id: number;
  pes_nome: string;
  pes_email: string;
  pes_telefone: string;
  pes_logradouro: string;
  pes_complemento: string;
  pes_bairro: string;
  cid_id: number;
  pes_status: number;
}

export interface UsuarioOut {
  pessoa: PessoaOut;
}

export interface ProdutoOut {
  pro_id: number;
  pro_nome: string;
  pro_descricao: string;
  pro_estoque_ong: number;
  pro_estoque_doacoes: number;
  pro_status: number;
}

export class SaidaService {
  static async getAll(): Promise<SaidaOut[]> {
    const token = Cookies.get("user-token");
    const response = await api.get("/saidas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async create(data: SaidaIn): Promise<void> {
    const token = Cookies.get("user-token");
    const response = await api.post("/saidas", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return;
  }
}

