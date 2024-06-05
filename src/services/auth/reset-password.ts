import api from "../api";
import { LoginRequest, ResetPasswordRequest } from "./types";
import Cookies from "js-cookie";

export class ResetPassword {
  static async execute(data: ResetPasswordRequest): Promise<any> {
    const response = await api.patch(`auth/reset-password`, data);
    return response.data;
  }
}
