import React from 'react';
import Header from '../components/HeaderLogin/HeaderLogin';
import "./LoginSignUp.css"

const SignUpMed = () => {
  return (
    <><Header />
    <section style={{ backgroundImage: "url(./background-image.png)" }} className="login-section">
    <div className="signup-card">
      <div className="signup-input-div">
      <p className="signup-title">Criar Conta</p>
      <p className="signup-number">Nº de cédula profissional</p>
      <input type="text" className="signup-input"></input>
      <p className="signup-email">Email</p>
      <input type="text" className="signup-input"></input>
      <p className="signup-password">Palavra-passe</p>
      <input type="text" className="signup-input"></input>
      <center><p className="text-account">Já tem conta? <a href="./RegistoUtente.js" className="login">Registe-se aqui</a></p></center>
      <center><button className="signup-btn">Criar conta</button></center>
    </div></div>
    </section></>
  );
}

export default SignUpMed;