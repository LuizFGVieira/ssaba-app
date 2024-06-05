import api from "../api";
import { LoginRequest } from "./types";
import Cookies from "js-cookie";

export class SignIn {
  static async execute(data: LoginRequest): Promise<any> {
    const response = await api.post(`auth/login`, data);
    console.log('TOKEN:', response.data);
    Cookies.set("user-token", response.data.token, {
      expires: 1, // O cookie expira em 1 dia
      secure: false, // Use `true` se estiver usando HTTPS
      sameSite: "Lax", // Para proteger contra CSRF
      path: "/", // Faz o cookie estar disponível em todas as rotas
    });
    
    Cookies.set("user-permission", response.data.usuario.role, {
      expires: 1, // O cookie expira em 1 dia
      secure: false, // Use `true` se estiver usando HTTPS
      sameSite: "Lax", // Para proteger contra CSRF
      path: "/", // Faz o cookie estar disponível em todas as rotas
    });

    return response.data;
  }
}
