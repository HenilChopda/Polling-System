import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Typist from "react-typist";
import { useTranslation } from 'react-i18next';
import { MyContext } from "../components/ContextProvider";
import trail from "../images/trail.svg";
import "./Home.css";

function Home() {
  const { user } = useContext(MyContext);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 h-screen mt-20 bgimg">
      <div className="col-span-2 md:col-span-1 lg:col-span-1 bg-cover bg-center flex items-center justify-center text-black">
        <div className="text-center align-bottom p-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <Typist>
              {t('welcome')}
            </Typist>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8">
            {t('description')}
          </p>
        </div>
      </div>

      <div className="col-span-2 md:col-span-1 lg:col-span-1"></div>

      <div className="col-span-2 md:col-span-1 lg:col-span-1 bg-cover bg-center flex items-center justify-center">
        <div className="text-center text-black p-6">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            {t('aboutCreatePoll')}
          </p>
          <p className="text-md md:text-lg lg:text-xl my-8">
            {t('createPollDescription')}
          </p>
          <Link
            to={user ? "/createpoll" : "/login"}
            className="btn bg-emerald-500 text-black py-2 px-6 rounded-full mb-4"
          >
            {t('createPollButton')}
          </Link>
        </div>
      </div>

      <div className="col-span-2 md:col-span-1 lg:col-span-1 bg-cover bg-center flex items-center justify-center text-black text-center">
        <img src={trail} alt="SVG Image" className="h-3/5" />
      </div>

      <div className="col-span-2 md:col-span-1 lg:col-span-1 bg-cover bg-center flex items-center justify-center"></div>

      <div className="col-span-2 md:col-span-1 lg:col-span-1 bg-cover bg-center flex items-center justify-center mb-12">
        <div className="text-center text-black p-6">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            {t('aboutVotePoll')}
          </p>
          <p className="text-md md:text-lg lg:text-xl m-8">
            {t('votePollDescription')}
          </p>
          <Link
            to={user ? "/votepoll" : "/login"}
            className="btn bg-emerald-500 text-black py-2 px-6 rounded-full "
          >
            {t('votePollButton')}
          </Link>
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-center bg-gray-800 text-white p-4">
        <p>{t('footer')}</p>
      </div>

    </div>
  );
}

export default Home;

// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import Typist from "react-typist";
// // import "react-typist/dist/Typist.css";
// import { MyContext } from "../components/ContextProvider";
// import trail from "../images/trail.svg";
// import "./Home.css";

// function Home() {
//   const { user } = useContext(MyContext);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 h-screen mt-20 bgimg">
//       {/* First Row - Welcome Text */}
//       <div className="col-span-2 md:col-span-1 lg:col-span-1 bg-cover bg-center flex items-center justify-center text-black">
//         <div className="text-center align-bottom p-6">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
//             <Typist>
//               Welcome to <span className="text-emerald-500">VoiceVault!</span>
//             </Typist>
//           </h1>
//           <p className="text-lg md:text-xl lg:text-2xl mb-8">
//             Ignite Conversations, Empower Voices. Your Platform for Dynamic
//             Polls and Inclusive Decision-Making
//           </p>
//         </div>
//       </div>

//       {/* Second Row - Blank Grid Space */}
//       <div className="col-span-2 md:col-span-1 lg:col-span-1"></div>

//       {/* Third Row - Create Poll */}
//       <div className="col-span-2 md:col-span-1 lg:col-span-1 bg-cover bg-center flex items-center justify-center">
//         <div className="text-center text-black p-6">
//           <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
//             About Create Poll
//           </p>
//           <p className="text-md md:text-lg lg:text-xl my-8">
//             Unleash your creativity and shape conversations by crafting engaging
//             polls that spark discussions and capture the essence of diverse
//             opinions
//           </p>
//           <Link
//             to={user ? "/createpoll" : "/login"}
//             className="btn bg-emerald-500 text-black py-2 px-6 rounded-full mb-4"
//           >
//             Create a Poll
//           </Link>
//         </div>
//       </div>

//       {/* Fourth Row - SVG */}
//       <div className="col-span-2 md:col-span-1 lg:col-span-1 bg-cover bg-center flex items-center justify-center text-black text-center">
//         <img src={trail} alt="SVG Image" className="h-3/5" />
//       </div>

//       {/* Fifth Row - Blank */}
//       <div className="col-span-2 md:col-span-1 lg:col-span-1 bg-cover bg-center flex items-center justify-center"></div>

//       {/* Sixth Row - Vote Poll */}
//       <div className="col-span-2 md:col-span-1 lg:col-span-1 bg-cover bg-center flex items-center justify-center mb-12">
//         <div className="text-center text-black p-6">
//           <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
//             About Vote Poll
//           </p>
//           <p className="text-md md:text-lg lg:text-xl m-8">
//             Empower your voice by engaging in insightful polls that influence
//             community decisions and reflect the collective pulse.
//           </p>
//           <Link
//             to={user ? "/votepoll" : "/login"}
//             className="btn bg-emerald-500 text-black py-2 px-6 rounded-full "
//           >
//             Vote a Poll
//           </Link>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="col-span-2 flex items-center justify-center bg-gray-800 text-white p-4">
//         <p>&copy; 2024 VoiceVault. All rights reserved.</p>
//       </div>
//     </div>
//   );
// }

// export default Home;
