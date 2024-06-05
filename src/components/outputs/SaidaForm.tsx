import {
  formataCPF,
  formataRG,
  formataTelefone,
  validarCPF,
  validaEmail,
  validaTamanhoRg,
  validaTamanhoTelefone,
  validarDataNascimento,
} from "@/src/services/fisica/utils";
import React, { ChangeEvent, useEffect, useState } from "react";
import FisicaService, { FisicaIn, FisicaOut } from "@/src/services/fisica";
import { CidadeOut, CidadeService } from "@/src/services/cidade";
import { EstadoService } from "@/src/services/estado";
import { format } from "date-fns";
import AvisoModal from "../AvisoModal";
import SelectEstado from "../SelectEstado";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ItensSaidaIn, SaidaService } from "@/src/services/saida";
import { ProdutoService } from "@/src/services/produto";

const SaidaForm = () => {
  const [popAviso, setpopAviso] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [pessoas, setPessoas] = useState<FisicaOut[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [itensSaida, setItensSaida] = useState<ItensSaidaIn[]>([]);
  const [formData, setFormData] = useState({
    pessoa: 0,
    observacao: "",
  });

  useEffect(() => {
    fetchPessoas();
    fetchProdutos();
  }, []);

  const fetchPessoas = async () => {
    const pessoas = await FisicaService.getFisicas();
    setPessoas(pessoas);
  };

  const fetchProdutos = async () => {
    const produtos = await ProdutoService.getAll();
    setProdutos(produtos);
  };

  const handleStringChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };

  const addItemSaida = () => {
    setItensSaida([...itensSaida, { pro_id: 0, itens_sai_quantidade: 0 }]);
  };

  const removeItemSaida = (index: number) => {
    const newItensSaida = [...itensSaida];
    newItensSaida.splice(index, 1);
    setItensSaida(newItensSaida);
  }

  const handleQuantidade = (value: any, index: number) => {
    const newItensSaida = [...itensSaida];
    newItensSaida[index].itens_sai_quantidade = value;
    setItensSaida(newItensSaida);
  }

  const handleProduto = (value: any, index: number) => {
    const newItensSaida = [...itensSaida];
    newItensSaida[index].pro_id = value;
    setItensSaida(newItensSaida);
  }

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    await SaidaService.create({
      pes_id: formData.pessoa,
      sai_observacao: formData.observacao,
      itensSaida: itensSaida,
    })
    setIsLoading(false);
  };

  return (
    <>
      <AvisoModal
        popAviso={popAviso}
        setpopAviso={setpopAviso}
        mensagem={mensagem}
        setMensagem={setMensagem}
      />
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pessoa: *</span>
          </label>
          <select
            onChange={handleNumberChange}
            name="pessoa"
            value={formData.pessoa}
            className="select select-bordered"
            id="pessoa"
          >
            {!(pessoas.length > 0) && (
              <option value="" selected>
                Selecione uma pessoa
              </option>
            )}
            {pessoas.map((pessoa) => {
              return (
                <option key={pessoa.pes_nome} value={pessoa.pes_id}>
                  {pessoa.pes_nome}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Observação: </span>
          </label>
          <input
            type="text"
            name="observacao"
            value={formData.observacao}
            onChange={handleStringChange}
            className="input input-bordered"
            required
          />
        </div>
        {itensSaida.map((item, index) => {
          return (
            <div className="columns-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Produto: *</span>
                </label>
                <select
                  onChange={(e) => handleProduto(e.target.value, index)}
                  name="pessoa"
                  value={itensSaida[index].pro_id}
                  className="select select-bordered"
                  id="pessoa"
                >
                  {!(produtos.length > 0) && (
                    <option value="" selected>
                      Selecione um produto
                    </option>
                  )}
                  {produtos.map((produto) => {
                    return (
                      <option key={produto.pro_nome} value={produto.pro_id}>
                        {produto.pro_nome}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="columns-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Quantidade: *</span>
                  </label>
                  <input
                    type="text"
                    name="quantidade"
                    value={itensSaida[index].itens_sai_quantidade}
                    onChange={(e) => handleQuantidade(e.target.value, index)}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div
                  className="w-full btn btn-secondary mt-9"
                  onClick={() => removeItemSaida(index)}
                >
                  <AiOutlineMinus /> Remover
                </div>
              </div>
            </div>
          );
        })}
        <div
          className="w-full btn btn-primary mt-4"
          onClick={() => addItemSaida()}
        >
          <AiOutlinePlus /> Adicionar Produto
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

export default SaidaForm;
