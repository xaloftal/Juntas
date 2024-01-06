import React from 'react';
import Header from '../components/HeaderLogin/HeaderLogin';
import "./LoginSignUp.css";

const Login = () => {
  return (
    <><Header />
     <section style={{ backgroundImage: "url(./background-image.png)" }} className="login-section">
    <div className="login-card">
      <div className="login-input-div">
      <p className="login-title">Iniciar sessão</p>
      <p className="login-email">Email</p>
      <input type="text" className="login-input"></input>
      <p className="login-password">Palavra-passe</p>
      <input type="text" className="login-input"></input>
      <center><p className="text-no-account">Não tem conta? <a href="./RegistoUtente.js" className="sign-up">Registe-se aqui</a></p></center>
      <center><button className="login-btn">Iniciar sessão</button></center>
    </div></div>
    </section>
  </>
  );
}

export default Login;
