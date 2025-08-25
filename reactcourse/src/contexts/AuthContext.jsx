import React, { createContext , useState} from "react";
import {LogIn , LogOut ,UserCheck ,UserRoundX} from 'lucide-react';

export const AuthContext = createContext();

const  AuthContextProvider = ({children}) => {


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const changeAuthState = () => {
        setIsLoggedIn(prev => !prev)
    }

    const authicon = isLoggedIn === true ?  (<><UserCheck className="w-5 h-5 text-yellow-400 border rounded-3xl" />  logged in </>)  : (<><UserRoundX className="w-5 h-5 text-gray-800" /> login </>); 

    return(
        <AuthContext.Provider value={{isLoggedIn ,changeAuthState ,authicon}}>
            {children}
        </AuthContext.Provider>
     )
}

export default AuthContextProvider;