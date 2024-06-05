import { AiOutlinePlus } from 'react-icons/ai'
import { useState } from 'react';
import FisicaModal from '../FisicaModal';
import SaidaForm from './SaidaForm';

const CadastrarSaida = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <div>
      <button className="w-full btn btn-primary" onClick={() => setModalOpen(true)}> <AiOutlinePlus/> Cadastrar Saida</button>
      <FisicaModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <SaidaForm />
        <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </FisicaModal>
    </div>
  );
};

export default CadastrarSaida;
