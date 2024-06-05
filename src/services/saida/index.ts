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

export class SaidaService {
  static async getAll(): Promise<any> {
    const token = Cookies.get("user-token");
    const response = await api.get("/saidas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async create(data: SaidaIn): Promise<any> {
    const token = Cookies.get("user-token");
    const response = await api.post("/saidas", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}

