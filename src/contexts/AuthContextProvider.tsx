import { createContext, ReactNode, useState, useEffect } from 'react'; // ReactNode é o retorno de um componente React

//Firebase
import { auth, firebase } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType); // colocar dentro de createContext o formato de dado que será recebido

const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>(); // inicia estado como undefined

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => { // onAuthStateChanged é função de auth do firebase que verifica se anteriormente já havia um login realizado na nossa aplicação
      if(user) {
        const { displayName, photoURL, uid } = user;
  
        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, []) // primeiro parametro é uma função a ser executada e segundo é quando ela deve ser executada(sempre será um array ou vetor) // qd segundo paranetro for vazio será desparado apenas quando a página for carregado a primeira vez

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider)

    if(result.user) {
      const { displayName, photoURL, uid } = result.user;

      if(!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}> {/* mandando por contexto um objeto com estado e função que altera estado */}
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;
