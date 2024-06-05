"use client";
import { Sidebar } from "@/src/components/SideBar";
import ListaUsuarios from "@/src/components/users/ListaUsuarios";
import "../styles/styles.css";

export default function PersonScreen() {
  return (
    <>
      <Sidebar />
      <main className="pl-72 pr-8">
        <div className="text-center my-5 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Gerenciamento de usuários</h1>
        </div>
        <ListaUsuarios />
      </main>
    </>
  );
}
