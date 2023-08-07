import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister({ email, password });
  };
  
  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  };

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form
        className="auth__form"
        onSubmit={handleSubmit}
      >
        <fieldset className="auth__fieldset">
          <input
            name="email"
            type="email"
            className="auth__input"
            value={email}
            placeholder="Email"
            maxLength={30}
            onChange={handleChangeEmail}
            required
          />
          <input
            name="password"
            type="password"
            className="auth__input"
            value={password}
            placeholder="Пароль"
            minLength={3}
            maxLength={10}
            onChange={handleChangePassword}
            required
          />
        </fieldset>
        <button
          className="auth__submit"
        >
          Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}