"use client";
import { useForm } from "react-hook-form";
import "./styles/styles.css";
import { SignIn } from "../services/auth/sign-in";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "../components/Loader";
import ErrorModal from "../components/ErrorModal";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await SignIn.execute({
        email: data.email,
        senha: data.password,
      });
      router.push("/home");
    } catch (error) {
      setError("Credenciais inválidas");
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <ErrorModal
        mensagem={error}
        setVisible={() => setError("")}
        visible={error !== ""}
      />
      <Loader show={isLoading} />
      <div className="flex min-h-full h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-50">
            Entre com sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                <div className="text-sm">
                  <a
                    href="/signup"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
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

            <div className="flex items-center justify-between flex-col">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Entrar
              </button>
              <a
                href="/signup"
                className="font-semibold text-indigo-600 hover:text-indigo-500 pt-4 text-sm"
              >
                Primeiro acesso?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
