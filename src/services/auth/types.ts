export type LoginRequest = {
    email: string;
    senha: string;
}

export type ResetPasswordRequest = {
    usu_senha: string,
    pes_email: string,
    pes_rg: string,
    pes_telefone: string,
    pes_nome: string,
    pes_cpf: string,
}