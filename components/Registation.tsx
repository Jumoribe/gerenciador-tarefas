import { useState } from "react";
import { executeRequest } from "../services/api";
import { NextPage } from "next";
import { FaRegUser } from "react-icons/fa";


/* eslint-disable @next/next/no-img-element */
export const Registration: NextPage<any> = ({
    setRegistered
}) => {

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);


    const doRegistration = async () => {
        try {
            setLoading(true);
            setError('');
            if (!login && !password && !name) {
                setError('Favor informar nome, email e senha');
                setLoading(false);
                return;
            }

            const body = {
                name,
                email,
                password
            }

            const result = await executeRequest('user', 'POST', body);
            if (result && result.status == 200) {
                setRegistered(true);
            } else {
                setError('Não foi possivel criar usuário, tente novamente');
            }
        } catch (e: any) {
            console.log(e);
            if (e?.response?.data?.error) {
                setError(e?.response?.data?.error);
            } else {
                setError('Não foi possivel criar usuário, tente novamente');
            }
        }

        setLoading(false);
    }

    return (
            <form>
            <p className="error">{error}</p>
            <div className="input">
                <FaRegUser className="icon"/>
                <input type="text" placeholder="Informe seu nome"
                    value={name} onChange={evento => setName(evento.target.value)} />
            </div>
            <div className="input">
                <img src="/mail.svg" alt="Informe seu email" />
                <input type="text" placeholder="Informe seu email"
                    value={email} onChange={evento => setEmail(evento.target.value)} />
            </div>
            <div className="input">
                <img src="/lock.svg" alt="Informe sua senha" />
                <input type="password" placeholder="Informe sua senha"
                    value={password} onChange={evento => setPassword(evento.target.value)} />
            </div>
            <button type="button" onClick={doRegistration} disabled={isLoading}
                className={isLoading ? 'loading' : ''}>
                {isLoading ? '...Carregando' : 'Criar Conta'}
            </button>
            <div className="register">Já possui uma conta? <span onClick={() => setRegistered(true)}>Click aqui.</span></div>
            </form>
    )
}
