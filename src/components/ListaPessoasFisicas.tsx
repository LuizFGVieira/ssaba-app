import FisicaService, { FisicaOut } from "@/src/services/fisica";
import { formataCPF, formataTelefone } from "@/src/services/fisica/utils";
import { useEffect, useState } from "react";
import { FaEdit, FaAddressCard, FaLock, FaLockOpen } from "react-icons/fa";
import FisicaModal from "./FisicaModal";
import FisicaForm from "./FisicaForm";
import FisicaCard from "./FisicaCard";
import CardModal from "./CardModal";
import { Loader } from "./Loader";
import { ConfirmationModal } from "./ConfirmationModal";
import Cookies from "js-cookie";

const ListaPessoasFisicas = () => {
  const [fisicas, setFisicas] = useState<FisicaOut[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pessoaId, setPessoaId] = useState(0);
  const [cardOpen, setCardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({
    show: false,
    onConfirm: () => {},
  });

  const role = Cookies.get("user-permission");

  useEffect(() => {
    fetchFisicas();
  }, []);

  const fetchFisicas = async () => {
    const data = await FisicaService.getFisicas();
    setFisicas(data);
  };

  const closeConfirmationModal = () => {
    setConfirmationModal({ show: false, onConfirm: () => {} });
  };

  const unlockFisica = async (fisica: FisicaOut) => {
    setIsLoading(true);
    await FisicaService.updateFisica(fisica.pes_id, {
      ...fisica,
      pes_status: 3,
    });
    await fetchFisicas();
    setIsLoading(false);
  };

  return (
    <>
      <Loader show={isLoading} />
      <ConfirmationModal
        message="Essa operação não pode ser desfeita"
        title="Você deseja liberar o acesso desta pessoa?"
        onConfirm={confirmationModal.onConfirm}
        onCancel={closeConfirmationModal}
        show={confirmationModal.show}
      />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fisicas.map((fisica, index) => (
              <tr key={index}>
                <td>{fisica.pes_nome}</td>
                <td>{formataCPF(fisica.fis_cpf)}</td>
                <td>{fisica.pes_email}</td>
                <td>{formataTelefone(fisica.pes_telefone)}</td>
                <td>{fisica.pes_status ? "Ativo" : "Inativo"}</td>
                <td>
                  <FaEdit
                    cursor="pointer"
                    onClick={() => {
                      setPessoaId(fisica.pes_id);
                      setModalOpen(true);
                    }}
                    className="text-blue-300"
                    size={20}
                  />
                  <FisicaModal
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                  >
                    <FisicaForm pessoaId={pessoaId} />
                    <button
                      onClick={() => {
                        setModalOpen(false);
                        setPessoaId(0);
                      }}
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                      ✕
                    </button>
                  </FisicaModal>
                </td>
                <td>
                  <FaAddressCard
                    cursor="pointer"
                    onClick={() => {
                      setCardOpen(true), setPessoaId(fisica.pes_id);
                    }}
                    className="text-blue-300"
                    size={20}
                  />
                  <CardModal cardOpen={cardOpen} setCardOpen={setCardOpen}>
                    <FisicaCard pessoaId={pessoaId} setCardOpen={setCardOpen} />
                  </CardModal>
                </td>
                {fisica.pes_status === 1 && role === "1" && (
                  <td>
                    <FaLockOpen
                      cursor="pointer"
                      onClick={async () => {
                        setConfirmationModal({
                          show: true,
                          onConfirm: () => {
                            unlockFisica(fisica), closeConfirmationModal();
                          },
                        });
                      }}
                      className="text-blue-300"
                      size={20}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListaPessoasFisicas;
