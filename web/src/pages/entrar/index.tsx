import { useRouter } from "next/router";
import { Bus, CircleNotch } from "phosphor-react";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Logo, Main } from "../../styles/pages/entrar";
import Head from "next/head";

export default function Entrar() {
  const router = useRouter();


  const [identificador, setIdentificador] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const { auth, busy } = useContext(AuthContext);

  const [error, setError] = useState<string>();

  function goTo(path: string) {
    router.push(path)
  }

  async function authenticate(event: FormEvent) {
    event.preventDefault();

    const credenciais = {
      identificador,
      senha
    };

    await auth(credenciais);
  }

  return (
    <>
      <Head>
        <title>Moovooca - Entrar</title>
        <meta name='description' content='Linhas de Ônibus dos Campus UFC' />
      </Head>
      <Main>
        <div className='formContainer'>
          <Logo onClick={() => goTo('/')}>
            <Bus size={24} weight="regular" color="#276749" />
            <span>
              moovooca
            </span>
          </Logo>
          <h4>Entrar</h4>
          <form onSubmit={authenticate}>
            <input type="text" placeholder="Nome de usuário ou email" onChange={event => setIdentificador(event.target.value)} />
            <input type="password" placeholder="Senha" onChange={event => setSenha(event.target.value)} />

            <div className="buttonContainer">
              <button type="button" onClick={() => goTo('/criar')}>
                Criar Conta
              </button>
              <button type="submit" className="createAccount">
                {busy ? <CircleNotch className="load" size={24} weight="regular" color="#fff" /> : 'Entrar'}
              </button>
            </div>
          </form>
          {error && <p>{error}</p>}
        </div>
      </Main>
    </>
  )
}