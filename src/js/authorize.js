import {auth} from "./firebase.js";
import { createUserWithEmailAndPassword  } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { signOut } from "firebase/auth";

export function Authorize(){

    // Signup    
    const registerUser = async (fullname,email,password)=>{

        const defaultprofileimg = "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: fullname,
                photoURL: defaultprofileimg
            }).then(() => {
                    // set name to local storage
                    setlocalname(user);

                    // Redirect to index.html
                    window.location.href = "../index.html";
                });

            // console.log(user);
        }catch(error){
            console.log("Error registering user :",error);
        }

    };



    // Signin
    const loginUser = (email,password)=>{

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // console.log(userCredential.user);

                // set name to local storage
                setlocalname(userCredential.user);

                window.location.href = "../index.html";
            })
            .catch((error) => {
                console.log("Error logging in :",error.message);
                window.alert("Authentication went wrong. Please try again!");
            });

    }



    // Signout
    const logoutUser = ()=>{
        
        signOut(auth)
            .then(() => {
                // unset name from local storage
                unsetlocalname();

                window.location.href = "../signin.html";
            }).catch((error) => {
                console.log("Error logging out = ",error.message);
            });

    };



    // Reset Password
    const resetPassword = async (email,msg)=>{

        try{
            await sendPasswordResetEmail(auth, email);

            msg.textContent = "Password reset email has sent. Please check your inbox.";
            msg.style.color = "green";
            msg.style.fontSize = "11px";
        }catch(error){
            // console.log("Error sending password reset email = ",error.message);

            msg.textContent = `Error : ${error.message}`;
            msg.style.color = "red";
            msg.style.fontSize = "11px";
        }

    }



    // Google Signin
    const googleLogin = ()=>{

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                // console.log(result);

                // set name to local storage
                setlocalname(result.user);

                window.location.href = "../index.html";
            }).catch((error) => {
                console.log("Error logging in with google = ",error.message);
            });

    }



    // Auth Check
    const isLoggedIn = ()=>{

        onAuthStateChanged(auth, (userdata) => {
            if (userdata) {
                return true;
            } else {
                window.location.href = "../signin.html";
            }
        });

    }



    // Get User Info
    const getUser = (callback)=>{

        // callback("Hello World!");

        onAuthStateChanged(auth, (userdata) => {
            if (userdata) {
                callback(userdata);
            }
        });
        
    }

    const setlocalname = (userdata)=>{
        localStorage.setItem("username",userdata.displayName);
    }

    const unsetlocalname = ()=>{
        localStorage.removeItem("username");
    }

    return {registerUser,loginUser,logoutUser,resetPassword,googleLogin,isLoggedIn,getUser};
}