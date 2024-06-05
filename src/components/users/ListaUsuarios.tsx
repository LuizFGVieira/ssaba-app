import { UsuarioOut, UsuarioService } from "@/src/services/usuario";
import { useEffect, useState } from "react";
import { FaAddressCard, FaEdit, FaTrash } from "react-icons/fa";
import UsuarioModal from "./UsuarioModal";
import FisicaModal from "../FisicaModal";

const ListaUsuarios = () => {
  const [users, setUsers] = useState<UsuarioOut[]>([]);
  const [selectedUser, setSelectedUser] = useState<number>(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await UsuarioService.getAll();
    setUsers(data);
  };

  return (
    <>
      <FisicaModal modalOpen={selectedUser > 0} setModalOpen={() => setSelectedUser(0)}>
        <UsuarioModal userId={selectedUser} />
        <button onClick={() => setSelectedUser(0)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </FisicaModal>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.pes_nome}</td>
                <td>{user.pes_email}</td>
                <td>{user.tp_id === 1 ? "Administrador" : "Voluntário"}</td>
                <td>{user.ts_id === 1 ? "Ativo" : "Inativo"}</td>
                <td>
                  <FaEdit
                    cursor="pointer"
                    onClick={() => setSelectedUser(user.usu_id)}
                    className="text-blue-300"
                    size={20}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListaUsuarios;
