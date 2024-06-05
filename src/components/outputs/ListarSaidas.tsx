import { SaidaService } from "@/src/services/saida";
import { UsuarioOut, UsuarioService } from "@/src/services/usuario";
import { useEffect, useState } from "react";

const ListarSaidas = () => {
  const [data, setData] = useState<UsuarioOut[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await SaidaService.getAll();
    setData(data);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Pessoa</th>
              <th>Responsável</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr key={index}>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListarSaidas;
