import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "./ContextProvider";
import { useTranslation } from "react-i18next";
import DropDown from "./dropDown";

const Headers = () => {
  const { user } = useContext(MyContext);
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="p-4 flex justify-between items-center border shadow-lg shadow-emerald-150 ">
      <Link to={"/"} className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
        </svg>
        <span className="font-bold text-lg">VoiceVault</span>
      </Link>
      <div className="flex items-center gap-4">
        <DropDown />
        {/* <button
          onClick={() => changeLanguage('en')}
          className="btn bg-emerald-500 text-black py-2 px-4 rounded-full m-2"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage('de')}
          className="btn bg-emerald-500 text-black py-2 px-4 rounded-full m-2"
        >
          Deutsch
        </button>
        <button
          onClick={() => changeLanguage('gu')}
          className="btn bg-emerald-500 text-black py-2 px-4 rounded-full m-2"
        >
          ગુજરાતી
        </button> */}
        <Link
          to={user ? "/userprofile" : "/login"}
          className="flex border border-black/5 rounded-full gap-2 py-2 px-4"
        >
          {user && <div>{user.username}</div>}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
};

export default Headers;
