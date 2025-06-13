import { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import auth from "../utils/Firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { showGptSearchOption } from "../utils/gptSlice";
import { NETFLIX_LOGO_URL, PROFILE_LOGO } from "../utils/constants";
import { language } from "../utils/Textconstants";
import { setLanguage } from "../utils/languageSlice";
const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const gptSearch = useSelector((store) => store.gpt.showGptSearch);
  const lang = useSelector((store) => store.lang.language);
  const gptsearch= useSelector((store) => store.gpt.showGptSearch);

  const handleGptSearch = () => {
    dispatch(showGptSearchOption(gptSearch));
  };
  const handleLanhuageChange = (e) => {
    dispatch(setLanguage(e.target.value));
  }

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute top-0 left-0 p-4 z-10 w-[100%] bg-gradient-to-b from-black flex justify-between items-center">
      <div>
        <img className="w-36" src={NETFLIX_LOGO_URL} alt="logo" />
      </div>
      <div >
        <select className="bg-black text-white p-2 rounded-lg " onChange={handleLanhuageChange}>
          <option value="" disabled selected>
            Language
          </option>
          {language.map((lang) => (
            <option key={lang.key} value={lang.key}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      {user && (
        <div className="relative">
          <img
            src={user?.photoURL || PROFILE_LOGO}
            alt="profile"
            className="w-12 h-12 rounded cursor-pointer hover:opacity-90"
            onClick={handleProfileClick}
          />
          <button
            className="py-2 px-4 m-2 bg-purple-800 text-white rounded-lg mx-4"
            onClick={handleGptSearch}
          >
           {gptsearch ? "Home" : "GPT Search"}
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-20">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
