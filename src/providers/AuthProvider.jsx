import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null)

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    
    const googleProvier = new GoogleAuthProvider();
    
    // create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const editProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    } 

    // login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    // google login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvier);
    }

    // logout user
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }



    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            console.log('in auth state', currentUser);
            setUser(currentUser)
        })
        return () => {
            return unSubscribe();
        }
    }, [])




    const authInfo = {

        user,
        loading,
        setLoading,
        createUser,
        editProfile,
        loginUser,
        googleLogin,
        logOut,
        
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;