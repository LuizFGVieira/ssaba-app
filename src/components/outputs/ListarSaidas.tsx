import { SaidaOut, SaidaService } from "@/src/services/saida";
import { UsuarioOut, UsuarioService } from "@/src/services/usuario";
import { useEffect, useState } from "react";
import SaidaCard from "./SaidaCard";
import { FaAddressCard } from "react-icons/fa";
import CardModal from "../CardModal";
import { format } from "date-fns";

const ListarSaidas = () => {
  const [data, setData] = useState<SaidaOut[]>([]);
  const [selectedData, setSelectedData] = useState<SaidaOut | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await SaidaService.getAll();
    setData(data);
  };

  return (
    <>
      <CardModal cardOpen={selectedData !== null} setCardOpen={() => setSelectedData(null)}>
        <SaidaCard
          closeCard={() => {
            setSelectedData(null);
          }}
          saida={selectedData}
        />
      </CardModal>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Responsável</th>
              <th>Recebedor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{format(new Date(item.sai_data_registro), "dd/MM/yyyy HH:mm")}</td>
                <td>{item.usuario.pessoa.pes_nome}</td>
                <td>{item.pessoa.pes_nome}</td>
                <td>
                  <FaAddressCard
                    cursor="pointer"
                    onClick={() => {
                      setSelectedData(data[index]);
                    }}
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

export default ListarSaidas;
