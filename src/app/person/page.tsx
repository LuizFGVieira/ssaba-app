"use client";
import CadastrarPessoa from "@/src/components/CadastrarPessoa";
import ListaPessoasFisicas from "@/src/components/ListaPessoasFisicas";
import "../styles/styles.css";
import { Sidebar } from "@/src/components/SideBar";

export default function PersonScreen() {
  return (
    <>
      <Sidebar />
      <main className="pl-72 pr-8">
          <div className="text-center my-5 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Gerenciamento de pessoas</h1>
            <CadastrarPessoa />
          </div>
          <ListaPessoasFisicas />
      </main>
    </>
  );
}
