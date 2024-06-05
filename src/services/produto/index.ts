import api from "../api";
import Cookies from "js-cookie";

export class ProdutoService {
  static async getAll(): Promise<any> {
    const token = Cookies.get("user-token");
    const response = await api.get("/produtos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}
