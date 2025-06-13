import Header from "./Header";
import {useState,useRef} from "react";
import isValid from "../utils/validation";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import auth from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {addUser} from "../utils/userSlice";
import {useSelector} from "react-redux";
import { updateProfile } from "firebase/auth";
import {BG_URL} from "../utils/constants";
import {PROFILE_LOGO} from "../utils/constants";

const Login=()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store)=>store.value);
   const [signin, setSignin]=useState(true);
   const [error,setError]=useState("");
   const  email=useRef(null);
   const  password=useRef(null);
   const name = useRef(null);
   const age = useRef(null);

    const toggleSignin=()=>{
       setSignin(!signin);
    };
    
   const handleSignin = (e) => {
    e.preventDefault();
    const valid = isValid(email.current.value, password.current.value);
    if (valid !== true) {
        setError(valid);
    } else {
        if (!signin) {
            if (!name.current.value || name.current.value.trim().length < 2) {
                setError("Please enter a valid name (at least 2 characters)");
                return;
            }
            if (!age.current.value || isNaN(age.current.value) || Number(age.current.value) < 1) {
                setError("Please enter a valid age");
                return;
            }
           createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then(async (userCredential) => {
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: name.current.value,
      photoURL: {PROFILE_LOGO}
    });
    const { uid, email: userEmail, displayName, photoURL } = auth.currentUser;
    dispatch(
      addUser({
        uid: uid,
        email: userEmail,
        displayName: displayName,
        age: age.current.value,
        photoURL: photoURL
      })
    );
    navigate("/browse");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(errorCode + "-" + errorMessage);
  });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError(errorCode + "-" + errorMessage);
                });
        }
    }
}
    return (
        <div >
            <Header/>
            <div className="absolute">
                <img src={BG_URL}></img>
            </div>
               {/* Login Form */}
           <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 p-10 rounded-md w-[350px] min-h-[440px] flex flex-col justify-center shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-white">{signin? "Sign In" :"Sign Up"}</h2>
               {!signin&&  (<input 
                    type="text" 
                    placeholder="Full Name" 
                    ref={name}
                    className="p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400"
                />)}
                 {!signin&&  (<input 
                    type="text" 
                    placeholder="Age" 
                    ref={age}
                    className="p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400"
                />)}
                <input 
                    type="text" 
                    ref={email}
                    placeholder="Email Address" 
                    onChange={() => setError("")}
                    className="p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400"
                />
                <input 
                    type="password"
                    ref={password} 
                    placeholder="Password" 
                    onChange={() => setError("")}
                    className="p-3 mb-6 rounded bg-gray-800 text-white placeholder-gray-400"
                />
                 <p className=" text-red-500 text-xs font-medium mb-4 mt-1">{error}</p>
                <button className="bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold mb-4" onClick={handleSignin}>
                   {signin? "Sign In" :"Sign Up"}
                </button>
                <div className="text-sm text-gray-400">
                    {!signin? "Already an user?" :" New to Netflix?   "}
                    <span className="text-white hover:underline cursor-pointer" onClick={toggleSignin}>{!signin? "  Sign In" :"  Sign Up now"}</span>
                </div>
            </form>
       </div>
    )
};

export default Login;