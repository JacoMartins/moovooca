import { Bus, CircleNotch } from "phosphor-react";
import { useContext, useState } from "react";
import { api } from "../../services/api";
import { Logo, Main } from "../../styles/pages/criar";
import { useRouter } from "next/router";
import Head from "next/head";

export default function CreateAccount() {
  const router = useRouter()
  const [nome_usuario, setNome_usuario] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [sobrenome, setSobrenome] = useState<string>('');
  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('');
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');
  const [tipo, setTipo] = useState<number>(0);

  const [busy, setBusy] = useState<boolean>(false);

  const [error, setError] = useState<string>();

  function goTo(path: string) {
    router.push(path)
  }

  function checkForm(func: Function) {
    event?.preventDefault();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÁÇÉǴÍḰĹḾŃÓṔŔŚÚǗẂÝŹḈÀÈÌǸÒÙǛẀỲÃẼĨÑÕŨṼỸãẽĩñõũṽỹÂĈÊĜĤÎĴÔŜÛṼỸâĉêĝĥîĵôŝûŵŷẑàìǹòùǜẁỳáçéǵíḱĺḿńóṕŕśúǘẃýź!#$%¨&*()-=[]~^`´:;/?>.<,| '.split('');

    for (let n = 0; n < characters.length; n++) {
      if (nome_usuario.includes(characters[n])) {
        setError('Nome de usuário inválido. Tente não utilizar espaços, acentos ou letras maiúsculas.')
        return;
      }
    }

    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem!');
      return;
    }

    if (!nome_usuario || !nome || !sobrenome || !email || !senha || !confirmarSenha) {
      setError('Por favor, preencha todos os campos!');
      return;
    }

    setError(null);
    func();
  }

  async function createAccount() {
    setBusy(true);
    try {
      await api.post('/usuario', {
        nome_usuario,
        nome,
        sobrenome,
        senha,
        email,
        tipo
      })

      goTo('/')
    } catch (error) {
      console.log(error)
      setError('Houve um erro na requisição.')
    }

    setBusy(false);
  }

  return (
    <>
      <Head>
        <title>Moovooca - Criar conta</title>
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
          <h4>Criar conta</h4>
          <form onSubmit={() => checkForm(createAccount)}>
            <input type="text" placeholder="Nome de usuário" onChange={event => setNome_usuario(event.target.value)} />
            <div className="nameContainer">
              <input type="text" placeholder="Nome" onChange={event => setNome(event.target.value)} />
              <input type="text" placeholder="Sobrenome" onChange={event => setSobrenome(event.target.value)} />
            </div>
            <input type="email" placeholder="Email" onChange={event => setEmail(event.target.value)} />

            <input type="password" placeholder="Senha" onChange={event => setSenha(event.target.value)} />
            <input type="password" placeholder="Confirmar Senha" onChange={event => setConfirmarSenha(event.target.value)} />

            <div className="typeContainer">
              <span>Quero me cadastrar como:</span>

              <div className="selectContainer">
                <div className="radioContainer">
                  <input name="type_radio" id="user_radio" type="radio" value="0" onChange={event => setTipo(0)} />
                  <label htmlFor="user_radio">Usuário</label>
                </div>
                
                <div className="radioContainer">
                  <input name="type_radio" id="corp_radio" type="radio" value="1" onChange={event => setTipo(1)} />
                  <label htmlFor="corp_radio">Empresa</label>
                </div>
              </div>
            </div>

            <div className="buttonContainer">
              <button type="button" onClick={() => goTo('/entrar')}>
                Entrar
              </button>
              <button type="submit" className="createAccount">
                {busy ? <CircleNotch className="load" size={24} weight="regular" color="#fff" /> : 'Criar conta'}
              </button>
            </div>
          </form>
          {error && <p>{error}</p>}
        </div>
      </Main>
    </>
  )
}