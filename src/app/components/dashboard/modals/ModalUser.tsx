import { useEffect, useRef, useState } from "react";
import Modal from "../../common/Modal";
import { IoClose } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import { DataUserProps } from "src/app/dashboard/layout";

const ModalUser = ({ modalUser, setModalUser }: any) => {
  const [isEnteringModal, setIsEnteringModal] = useState(false);
  const [userData, setUserData] = useState<User>({} as User);

  const inputEmail = useRef<HTMLInputElement>(null);
  const oldPassInput = useRef<HTMLInputElement>(null);
  const newPassInput = useRef<HTMLInputElement>(null);
  const newPassConfirmationInput = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const getUserData = async () => {
    try {
      setIsLoading(false);
      const rawToken = localStorage.getItem("user") ?? "";
      const auth = JSON.parse(rawToken)?.access_token;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}user/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        },
      );

      return response.ok;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const loginToValidate = async () => {
    try {
      setIsLoading(false);
      const rawToken = localStorage.getItem("user") ?? "";
      const auth = JSON.parse(rawToken)?.access_token;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}auth/signIn`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
          body: JSON.stringify({
            name: userData.name,
            email: userData.email,
            password: userData.password,
          }),
        },
      );

      const data = await response.json();

      return { data: data, logged: !!data };
    } catch (error) {
      console.error(error);
      return { data: null, logged: false };
    }
  };

  const relogAndUpdateUser = async () => {
    if (userData) {
      const { data } = await loginToValidate();

      if (!data) return;

      console.log("data:", data);
      localStorage.setItem("user", JSON.stringify(data));
    }
  };

  const editUserData = async () => {
    const email = inputEmail.current?.value;
    const oldPass = oldPassInput.current?.value;
    const newPass = newPassInput.current?.value;
    const confirmationNewPass = newPassConfirmationInput.current?.value;

    if (!email || !oldPass || !newPass || !confirmationNewPass) {
      return;
    }

    const rawToken = localStorage?.getItem("user") ?? "";

    const dataUserToken = JSON.parse(rawToken);
    const accessToken: DataUserProps = jwtDecode(dataUserToken.access_token);

    if (!(newPass === confirmationNewPass)) {
      return;
    }

    const validate = await loginToValidate();

    if (!validate?.logged) return;

    try {
      setIsLoading(false);
      const rawToken = localStorage.getItem("user") ?? "";
      const auth = JSON.parse(rawToken)?.access_token;

      const userChangedInfo = {
        email: email ?? accessToken?.email,
        password: newPass ?? accessToken?.password,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}user/${accessToken?.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + auth,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userChangedInfo),
        },
      );

      const data = (await response.json()) as User;

      if (data) {
        setUserData(data);
        setIsLoading(true);
        relogAndUpdateUser();
      }
    } catch (error) {
      setIsLoading(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Modal>
      <div
        className="flex relative bg-[#efefef] w-[800px] max-w-full h-[500px] max-h-full p-5 rounded-lg"
        onMouseEnter={() => {
          setIsEnteringModal(true);
        }}
        onMouseLeave={() => {
          setIsEnteringModal(false);
        }}
      >
        <button
          className={`${!isEnteringModal && "md:opacity-0 cursor-pointer md:visible"} opacity-1 duration-300 absolute border border-1 border-color-[#191622] flex justify-center items-center right-[-8px] top-[-8px] hover:flex w-6 h-6 bg-white rounded-full`}
          onClick={() => {
            setModalUser(!modalUser);
          }}
        >
          <IoClose color="black" />
        </button>
        <span className="text-[#13111b] font-semibold text-[24px]">
          Editar informações
        </span>
        <div className="bg-[#212e4a] w-full h-full rounded-lg p-5">
          <div className="flex flex-col h-full gap-10">
            <div className="flex row gap-2">
              <input
                type="text"
                className="w-full h-6 rounded-md p-5 bg-transparent hover:bg-white active:bg-white checked:bg-white visited:bg-white  hover:text-black active:text-gray-900 visited:text-gray-900"
                placeholder="Email_"
                ref={inputEmail}
              />
            </div>
            <input
              type="password"
              className="w-full h-6 rounded-md p-5 bg-transparent hover:bg-white active:bg-white checked:bg-white visited:bg-white hover:text-black  text-white ::-webkit-calendar-picker-indicator"
              placeholder="Senha Antiga_"
              ref={oldPassInput}
            />
            <input
              type="password"
              className="w-full h-6 rounded-md p-5 bg-transparent hover:bg-white active:bg-white checked:bg-white visited:bg-white hover:text-black  text-white ::-webkit-calendar-picker-indicator"
              placeholder="Nova Senha_"
              ref={newPassInput}
            />
            <input
              type="password"
              className="w-full h-6 rounded-md p-5 bg-transparent hover:bg-white active:bg-white checked:bg-white visited:bg-white hover:text-black  text-white ::-webkit-calendar-picker-indicator"
              placeholder="Nova Senha_"
              ref={newPassConfirmationInput}
            />

            <button
              className="w-full h-fit rounded-md p-2 bg-transparent text-black bg-white"
              onClick={() => editUserData()}
            >
              <span>Alterar Cadastro</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalUser;
