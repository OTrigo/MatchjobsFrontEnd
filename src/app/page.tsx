"use client";

import { useRouter } from "next/navigation";
import connectToDb from "database/connect";

import React, { useState, ChangeEvent } from "react";

export default function Home() {
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
    <>
      <main className="login">
        <section className="login-form">
          <div className="login-form-input">
            <label
              htmlFor="input-email"
              className="login-form-input-email-label"
            >
              Email
            </label>
            <input
              type="email"
              className="login-form-input-email"
              id="input-email"
              placeholder="joao@example.com"
              onChange={handleEmailChange}
              required
            />
            <label
              htmlFor="input-password"
              className="login-form-input-password-label"
            >
              Senha
            </label>
            <input
              type="password"
              className="login-form-input-password"
              id="input-password"
              placeholder="*****"
              onChange={handlePasswordChange}
              required
            />
            <button
              type="submit"
              onClick={handleLoginButtonClick}
              className="login-form-input-button"
            >
              Enviar
            </button>
          </div>
        </section>
        <section className="login-illustration">
          <div className="login-illustration-content">
            <div className="login-illustration-content-text">
              <p>Lorem Ipsum</p>
            </div>
            <div className="login-illustration-content-image">
              Lorem Ipsum Image
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
