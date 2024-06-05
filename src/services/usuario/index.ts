import api from "../api";
import Cookies from "js-cookie";

export interface UsuarioOut {
  usu_id: number;
  pes_id: number;
  pes_nome: string;
  pes_email: string;
  tp_id: number;
  ts_id: number;
}

export interface UsuarioIn {
  ts_id: number;
  tp_id: number;
}

export class UsuarioService {
  static async getAll(): Promise<UsuarioOut[]> {
    const token = Cookies.get("user-token");
    const response = await api.get("/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data;
  }

  static async update(userId: number, data: UsuarioIn): Promise<void> {
    const token = Cookies.get("user-token");
    const response = await api.put("/usuarios/" + userId, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return;
  }
}
