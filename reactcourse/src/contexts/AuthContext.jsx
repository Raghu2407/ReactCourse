import React, { createContext , useState} from "react";

export const AuthContext = createContext();

const  AuthContextProvider = ({children}) => {


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const changeAuthState = () => {
        setIsLoggedIn(prev => !prev)
    }

    return(
        <AuthContext.Provider value={{isLoggedIn ,changeAuthState}}>
            {children}
        </AuthContext.Provider>
     )
}

export default AuthContextProvider;