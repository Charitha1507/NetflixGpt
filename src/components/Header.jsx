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

  // Debug logging
  console.log("Header - Current state:", { gptSearch, lang, user: !!user });

  const handleGptSearch = () => {
    console.log("GPT Search button clicked, current state:", gptSearch);
    dispatch(showGptSearchOption());
  };
  const handleLanguageChange = (e) => {
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
      <div>
        {gptSearch && (
          <select
            className="bg-black text-white p-2 rounded-lg border border-gray-600"
            value={lang || "en"}
            onChange={handleLanguageChange}
          >
            {language.map((langObj) => (
              <option key={langObj.key} value={langObj.key}>
                {langObj.name}
              </option>
            ))}
          </select>
        )}
      </div>
      {user && (
        <div className="flex items-center gap-4">
          <button
            className="py-2 px-4 bg-purple-800 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
            onClick={handleGptSearch}
          >
            {gptSearch ? "Home" : "GPT Search"}
          </button>
          <div className="relative">
            <img
              src={user?.photoURL || PROFILE_LOGO}
              alt="profile"
              className="w-12 h-12 rounded cursor-pointer hover:opacity-90"
              onClick={handleProfileClick}
            />
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
        </div>
      )}
    </div>
  );
};

export default Header;
