import React, { useState } from "react";
import AvisoModal from "../AvisoModal";
import { UsuarioService } from "@/src/services/usuario";
import ErrorModal from "../ErrorModal";

interface Props {
  userId: number;
}

const UsuarioModal = ({ userId }: Props) => {
  const [popAviso, setpopAviso] = useState(false);
  const [formData, setFormData] = useState({
    role: 0,
    status: 0,
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.role === 0 || formData.status === 0) {
      setError("Selecione um cargo e um status");
      return;
    }
    try {
      await UsuarioService.update(userId, {
        tp_id: formData.role,
        ts_id: formData.status,
      });
      window.location.reload();
    }catch(error) {
      setError("Não foi possível realizar essa operação")
    }
  };

  return (
    <>
      <AvisoModal
        popAviso={popAviso}
        setpopAviso={setpopAviso}
        mensagem={"Atualização concluída com sucesso"}
        setMensagem={() => {}}
      />
      <ErrorModal 
        mensagem={error}
        setVisible={() => setError("")}
        visible={error !== ""}
      />
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Escopo de permissão: *</span>
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="select select-bordered"
            required
          >
            <option value="0">
              Selecione
            </option>
            <option value="1">Administrador</option>
            <option value="2">Voluntário</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Status de usuário: *</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select select-bordered"
            required
          >
            <option value="0">
              Selecione
            </option>
            <option value="1">Ativo</option>
            <option value="2">Inativo</option>
          </select>
        </div>
        <div className="flex justify-end">
          <div className="mt-10 mr-5 badge badge-neutral">
            *: Campos obrigatórios
          </div>
          <div className="modal-action">
            <button type="submit" className="btn">
              Salvar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UsuarioModal;
