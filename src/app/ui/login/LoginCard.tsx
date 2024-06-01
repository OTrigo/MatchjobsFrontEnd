"use client";

import { useRouter } from "next/navigation";
import styles from "./login-card.module.scss";
import React, { useState, ChangeEvent, useEffect } from "react";
import { MutatingDots } from "react-loader-spinner";

const LoginCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (window !== undefined) {
      if (localStorage.getItem("user")) {
        const isAuthenticated = localStorage.getItem("user") !== undefined;
        isAuthenticated ? router.push("/dashboard") : setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginButtonClick = async () => {
    const user = {
      email,
      password,
    };

    try {
      setIsLoading(true);
      console.info("Fazendo request");
      const response = await fetch(
        "https://matchjobsbackend-7lo5.onrender.com/auth/signIn/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Erro ao enviar requisição: " + response.statusText);
      } else if (response.status === 201) {
        setIsLoading(false);
        const data = await response.json();
        console.log(JSON.stringify(data));
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/dashboard");
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };
  return (
    <main className={styles.login}>
      {isLoading ? (
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#0579bd"
          secondaryColor="#0579bd"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
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
                onInput={handleEmailChange}
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
                onInput={handlePasswordChange}
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
      )}
    </main>
  );
};

export default LoginCard;
