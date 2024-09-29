"use client";

import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, useEffect } from "react";
import { MutatingDots } from "react-loader-spinner";
import Image from "next/image";
import {
  MdOutlineArrowRight,
  MdPeopleAlt,
  MdPeopleOutline,
} from "react-icons/md";
import CustomIcon from "../helpers/CustomIcon";

const LoginCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [attempts, setAttempts] = useState<string>("");
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
  }, [router]);

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
        "https://mjbackend.azurewebsites.net/auth/signIn/",
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
      alert("Usuário não existente");
      console.error(err);
    }
  };
  return (
    <section className="flex w-screen h-screen">
      {isLoading ? (
        <main className="flex w-full h-full justify-center items-center">
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
        </main>
      ) : (
        <main className="flex w-full h-full flex-col md:flex-row">
          <section className="order-2 md:order-1 flex min-w-[50%] justify-center items-center h-screen px-10">
            <div className="flex flex-col items-start gap-2 max-w-[480px]">
              <MdPeopleAlt />
              <div>
                <div className="font-grotesk font-bold text-4xl pb-2">
                  Gerencie as vagas e candidaturas com poucos cliques.
                </div>
                <div className="font-inter font-thin text-md pb-4">
                  Gerencie as vagas e candidaturas com poucos cliques.
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <div className="flex gap-4">
                  <input
                    type="email"
                    className="flex rounded-md py-2 px-4 w-full"
                    id="input-email"
                    placeholder="joao@example.com"
                    onInput={handleEmailChange}
                    required
                  />
                </div>
                <div className="">
                  <input
                    type="password"
                    className="flex rounded-md py-2 px-4 w-full"
                    id="input-password"
                    placeholder="*****"
                    onInput={handlePasswordChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  onClick={handleLoginButtonClick}
                  className="flex w-full justify-between items-center p-3 outline-white outline-1 outline rounded-md font-grotesk font-bold hover:bg-white hover:text-black duration-300"
                >
                  Login
                  <MdOutlineArrowRight size={20} />
                </button>
              </div>
            </div>
          </section>
          <section className="order-1 md:order-2 gradient flex flex-grow w-full h-10 md:h-full"></section>
        </main>
      )}
    </section>
  );
};

export default LoginCard;
