"use client";

import { VscSparkle } from "react-icons/vsc";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import OpenAI from "openai";
import { FaArrowRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";

const AIButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [isEnteringAIModal, setIsEnteringAIModal] = useState(false);
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const pathName = usePathname();

  console.log(`${pathName}/add/?isAI=1`);

  const getOpenAIResponse = async (prompt: string) => {
    setLoadingResponse(true);

    console.log("Instanciando OpenAi");

    console.log("Prompt:", prompt);

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true, //TODO: remove this parameter
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Você é um assistente virtual para produzir vagas de trabalho. Retorne a descrição de uma vaga de trabalho em relação aos inputs registrados, responda em outra língua somente se for solicitado ou se for escrito em uma língua diferente do português.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    console.log(
      "Mensagem Final da API:",
      completion?.choices?.[0]?.message?.content,
    );
    window.localStorage.setItem(
      "lastGeneratedVacancy",
      completion?.choices?.[0]?.message?.content ?? "",
    );

    router.replace(`${pathName}/add/?isAI=1`);

    setIsSent(false);
    setLoadingResponse(false);
  };

  useEffect(() => {
    console.log("Enviou", isSent);
    if (isSent) {
      console.log("Foi enviado:", isSent);
      getOpenAIResponse(prompt);
    }
  }, [isSent]);

  return (
    <>
      <button
        className="p-3 bg-[#5d57c9] text-white border-none rounded-md cursor-pointer inline-flex shadow-[0_0px_20px_5px_rgba(255,255,255,0.3)]"
        onClick={() => setModalOpen(!modalOpen)}
      >
        <span className="inline-flex gap-2">
          <span>Add With</span>
          <VscSparkle size={24} />
        </span>
      </button>
      {modalOpen && (
        <Modal>
          <div
            className="relative flex bg-white rounded-md w-[600px] h-fit min-h-64 p-4 text-[#000] box-shadow gap-4"
            onMouseEnter={() => {
              setIsEnteringAIModal(true);
            }}
            onMouseLeave={() => {
              setIsEnteringAIModal(false);
            }}
          >
            <h2 className="text-[24px] font-bold">Creating with AI</h2>
            <button
              className={`${!isEnteringAIModal && "md:opacity-0 cursor-pointer md:visible"} opacity-1 duration-300 absolute border border-1 border-color-[#191622] flex justify-center items-center right-[-8px] top-[-8px] hover:flex w-6 h-6 bg-white rounded-full`}
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            >
              <IoClose />
            </button>
            <textarea
              className="relative w-full min-h-5 bg-[#172134] rounded-md resize-none text-white p-5 overflow-hidden"
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
            <button
              className="flex absolute w-5 h-5 justify-center items-center bottom-7 rounded-full right-7 bg-white"
              onClick={() => setIsSent(true)}
            >
              <FaArrowRight />
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AIButton;
