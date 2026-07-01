import { createContext,useContext, useState } from "react";


type AuthContextType = {
    token:string | null;
    userName:string | null;
    name:string | null;
    email:string | null;
    login:(token:string,username:string,name:string,email:string) => void;
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [token,setToken] = useState<string | null>(localStorage.getItem('token'));
    const [userName,setUserName] = useState<string | null>(localStorage.getItem('userName'));
    const [name,setName] = useState<string | null>(localStorage.getItem('name'));
    const [email,setEmail] = useState<string | null>(localStorage.getItem('email'));

    const login = (jwt:string,username:string,name:string,email:string) => {
        localStorage.setItem("token",jwt);
        localStorage.setItem("userName",username);
        localStorage.setItem("name",name);
        localStorage.setItem("email",email);
        setToken(jwt);
        setUserName(username);
        setName(name);
        setEmail(email);
    }
    const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setToken(null);
    setUserName(null);
    setName(null);
    setEmail(null);
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        userName,
        name,
        email,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};

