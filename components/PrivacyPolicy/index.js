import React, { useEffect, useState } from 'react'

import Cookies from 'js-cookie'
import Router from 'next/router'
import PropTypes from 'prop-types'

import { api, setHeader } from '../../utils/axios'
import styles from '../GlobalComponents/Modal/styles'

const PrivacyPolicy = ({ credentials }) => {
  const [modal, setModal] = useState(false)
  const [reject, setReject] = useState(false)

  useEffect(() => {
    if (credentials.email && !credentials.dataPolicyAccepted) {
      setHeader(credentials)
      setModal(true)
    }
  }, [])

  const handleReject = async () => {
    await api.delete(`/user/${credentials._id}`)
    setModal(false)
    Cookies.remove('ctech_credentials')
    Router.push('/')
  }

  const handleAccepted = async () => {
    await api.patch(`/user/dataPolicyAccepted/${credentials._id}`)
    setModal(false)
  }

  const getContent = () => {
    return reject ? content.reject : content.default
  }

  const content = {
    default: (
      <>
        {modal
          ? <div className="modal">
            <div className="modal-content">
              <h2 className="title-modal">Proteção de dados</h2>
              <div className="modal-body">
                <p>
                  <b>Que Dados coletamos e como nós coletamos?</b> <br />
                Dados obtidos quando você se candidata a uma vaga: quando você se candidata a uma vaga para alocação em
                um de nossos clientes, coletamos dados adicionais sobre você, por meio de avaliações, testes, dinâmicas
                e feedbacks.
                </p>
                <p>
                  <b>Como e por que utilizamos seus dados?</b> <br />
                Quando você se candidata a uma vaga para alocação em um de nossos clientes, os seus dados nos auxiliam a
                traçar o seu perfil profissional. Isso nos permite encontrar as melhores oportunidades para você, tanto
                para geração de conteúdo quanto para a oferta de vagas do seu interesse. Esses dados são fundamentais
                para que realizemos estudos aprofundados de interesse de mercado e pessoal a todo momento,
                possibilitando que nosso serviço seja continuamente aprimorado e modernizado.
                  <a href="https://impulso.network/privacidade" target="_blank" rel="noreferrer"> (Ler política completa)</a>
                </p>
                <div className="modal-buttons">
                  <button title="Recusar" className="modal-btn" onClick={() => setReject(true)}>Recusar</button>
                  <button title="Aceitar" className="modal-btn" onClick={handleAccepted}>Aceitar</button>
                </div>
              </div>
            </div>
            <style jsx>{styles}</style>
          </div>
          : null}
      </>
    ),
    reject: (
      <>
        {modal
          ? <div className="modal">
            <div className="modal-content">
              <h2 className="title-modal">Seus dados serão excluídos</h2>
              <div className="modal-body">
                <p className="center">
                Tem certeza que deseja excluir todos os seus dados do comunidades.tech? Todas as comunidades que você cadastrou, gerencia e possui, bem como os seus dados serão excluídos permanentemente.
                </p>
                <div className="modal-buttons">
                  <button title="Voltar" className="modal-btn" onClick={() => setReject(false)}>Cancelar</button>
                  <button title="Confirmar" className="modal-btn" onClick={handleReject}>Excluir mesmo assim</button>
                </div>
              </div>
            </div>
            <style jsx>{styles}</style>
          </div>
          : null}
      </>
    )
  }
  return getContent()
}

PrivacyPolicy.propTypes = {
  credentials: PropTypes.object
}

export default PrivacyPolicy
