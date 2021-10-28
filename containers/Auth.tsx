import { useState } from "react";
import { NextPage } from "next";
import { AccessTokenProps } from "../types/AccessTokenProps";
import { Registration } from "../components/Registation";
import { Login } from "../components/Login";


/* eslint-disable @next/next/no-img-element */
export const Auth: NextPage<AccessTokenProps> = ({
    setToken
}) => {


    const [isRegistered, setRegistered] = useState(true);


    return (
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap" className="logo" />
            {
             isRegistered ?
             <Login
              setToken={setToken}
              setRegistered={setRegistered}
             />
            :
             <Registration
             setToken={setToken}
             setRegistered={setRegistered}
             />
            }
        </div>
    )
}
