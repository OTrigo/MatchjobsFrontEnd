"use client";

import { useRouter } from "next/navigation";
import styles from "./login-card.module.scss";

import React, { useState, ChangeEvent } from "react";
const LoginCard = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginButtonClick = () => {
    const user = {
      email: email,
      password: password,
    };

    if (user.email === "exemplo@gmail.com" && user.password === "1234") {
      router.push("/dashboard");
    }
  };
  return (
    <main className={styles.login}>
      <section className={styles.loginForm}>
        <div className={styles.loginFormInput}>
          <div className={styles.inputGroup}>
            <label
              htmlFor="input-email"
              className={styles.loginFormInputLabel}
            >
              Email
            </label>
            <input
              type="email"
              className={styles.formInputEmail}
              id="input-email"
              placeholder="joao@example.com"
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label
              htmlFor="input-password"
              className={styles.loginFormInputLabel}
            >
              Senha
            </label>
            <input
              type="password"
              className={styles.formInputPassword}
              id="input-password"
              placeholder="*****"
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleLoginButtonClick}
            className={styles.formInputSubmitButton}
          >
            Enviar
          </button>
        </div>
      </section>
    </main>
  );
};

export default LoginCard;
