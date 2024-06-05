"use client";
import { useForm } from "react-hook-form";
import "../styles/styles.css";
import { SignIn } from "../../services/auth/sign-in";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "../../components/Loader";
import { ResetPassword } from "@/src/services/auth/reset-password";
import ErrorModal from "@/src/components/ErrorModal";

export default function SignupScreen() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    
    if(data.password !== data.confirmPassword) {
      setError("As senhas precisam ser iguais");
      return;
    }
    setIsLoading(true);
    try {
      await ResetPassword.execute({
        usu_senha: data.password,
        pes_email: data.email,
        pes_rg: data.rg,
        pes_telefone: data.telefone,
        pes_nome: data.name,
        pes_cpf: data.cpf,
      });
      router.push("/");
    } catch (error) {
      setError("Erro ao tentar realizar operação");
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <ErrorModal mensagem={error} setVisible={() => setError("")} visible={error !== ""} />
      <Loader show={isLoading} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-base">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-50">
            Confirme seus dados
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-slate-50"
              >
                Nome completo
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  type="name"
                  required
                  {...register("name")}
                  className="block w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div>
                <label
                  htmlFor="cpf"
                  className="block text-sm font-medium leading-6 text-slate-50"
                >
                  CPF
                </label>
                <div className="mt-2">
                  <input
                    id="cpf"
                    type="cpf"
                    required
                    {...register("cpf")}
                    className="block w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="telefone"
                  className="block text-sm font-medium leading-6 text-slate-50"
                >
                  Telefone
                </label>
                <div className="mt-2">
                  <input
                    id="telefone"
                    type="telefone"
                    required
                    {...register("telefone")}
                    className="block w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="rg"
                  className="block text-sm font-medium leading-6 text-slate-50"
                >
                  RG
                </label>
                <div className="mt-2">
                  <input
                    id="rg"
                    type="rg"
                    required
                    {...register("rg")}
                    className="block w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-slate-50"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  {...register("email")}
                  className="block w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-slate-50"
                >
                  Senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-slate-50"
                >
                  Confirmar senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div className="flex items-center justify-between flex-col">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
