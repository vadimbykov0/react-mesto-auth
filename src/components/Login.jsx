import React, { useState } from "react";

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin({ email, password });
  };

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  };

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  };

  return (
    <div className="auth">
      <h3 className="auth__title">Вход</h3>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <input
            className="auth__input"
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChangeEmail}
            required
          />
          <input
            className="auth__input"
            type="password"
            name="password"
            value={password}
            placeholder="Пароль"
            minLength={3}
            maxLength={10}
            onChange={handleChangePassword}
            required
          />
        </fieldset>
        <button className="auth__submit">Войти</button>
      </form>
    </div>
  );
}