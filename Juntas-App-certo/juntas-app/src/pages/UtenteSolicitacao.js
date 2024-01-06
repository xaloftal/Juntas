import React from 'react';
import './UtenteSolicitacao.css';
import './dropdownMenu.css';

const PacientPageOne = () => {
    return (
      <><div className="header-div">
        <img
            src={require("./juntas-logo.png")}
            alt="logo"
            className='img'/> 
        <div class="dropdown">
          <p className="header-content">Solicitações</p>
          <div class="dropdown-content">
            <a href="">Pedir uma Junta Médica</a>
            <a href="">Histórico de solicitações</a>
          </div>
        </div>
        <img
            src={require("./user.png")}
            alt="logo"
            className='img-user'/> 
      </div>   
      <section className="img-section">
        <div className="title-div">
          <p className="title-text">Solicitação de Junta Médica</p>
          <p className="title-subtext">Preencha o formulário e obtenha resposta rápida</p>
        </div>
      </section>
      <div className="form-div">
        <div className="form-header-div">
          <p>IDENTIFICAÇÃO</p>
        </div>
          <p className="form-text">Nome Completo</p>
          <input type="text" className="form-input"></input>
          <div className="form-two-inputs">
            <div className="form-div-two-inputs">
            <p className="form-text-one">Nº de Utente</p>
            <input type="text" className="form-input"></input></div>
            <div className="form-div-two-inputs">
            <p className="form-text-two">Nº Contribuinte</p>
            <input type="text" className="form-input"></input></div>
          </div></div></>
    );
  }
  
export default PacientPageOne;