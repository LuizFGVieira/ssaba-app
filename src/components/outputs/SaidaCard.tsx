import { SaidaOut } from "@/src/services/saida";
import { format } from "date-fns";
import React, { useEffect } from "react";

interface SaidaCardProps {
  closeCard: () => void;
  saida: SaidaOut | null;
}

enum Genero {
  Masculino = 1,
  Feminino = 2,
  Outro = 3,
}

const SaidaCard: React.FC<SaidaCardProps> = ({ saida, closeCard }) => {
  return (
    saida && (
      <div className="card card-compact w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body p-6">
          <h2 className="card-title text-center text-2xl font-bold mb-4">
            Informações
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Data:</span>
              <span>
                {format(new Date(saida.sai_data_registro), "dd/MM/yyyy HH:mm")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Responsável:</span>
              <span>{saida.usuario.pessoa.pes_nome}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Recebedor:</span>
              <span>{saida.pessoa.pes_nome}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Observação:</span>
              <span>{saida.sai_observacao}</span>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {saida.itens_saida.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.produto.pro_nome}</td>
                      <td>{item.itens_sai_quantidade}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="card-actions mt-4 justify-end">
            <button className="btn btn-primary" onClick={() => closeCard()}>
              Voltar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default SaidaCard;
