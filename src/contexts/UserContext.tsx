import { createContext } from "react";
import { DataUserProps } from "../app/dashboard/layout";

export const UserContext = createContext<DataUserProps | null>(null);
