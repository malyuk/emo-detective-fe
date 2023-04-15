import React, { useContext } from "react";
import { json, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { UserContext } from "../App";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

export default function Login() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const loginWithGoogle = (event, role) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        let userObj = {
          role: role,
          userId: response.user.uid,
          email: response.user.email,
        };
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObj),
        })
          .then((apiResponse) => apiResponse.json())
          .then((data) => {
            if (!data.success) {
              alert(data.message);
              setUser(null);
              return;
            }
            fetch(
              `${process.env.REACT_APP_API_BASE_URL}/lessons/Be5p0Vd76xg5wXHG7lsP`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  userId: response.user.userId,
                }),
              }
            )
              .then((res) => res.json())
              .then(() => {
                setUser({ ...data.data, ...response.user });
                navigate("/dashboard");
              });
          })
          .catch(alert);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <section className="bg-slate-100 py-12 px-4 min-h-screen">
      <div className="bg-white sm:max-w-3xl mx-auto p-10 rounded-xl">
        <h1 className="text-4xl text-center font-extrabold mb-8">Welcome!</h1>
        <p className="text-center text-2xl mb-8">
          Please sign in below to get started.
        </p>
        <div className="flex md:flex-row items-center flex-col gap-4 min-h-24">
          <div className="w-1/2 md:border-r-2 border-slate-100">
            <button
              onClick={(e) => loginWithGoogle(e, "teacher")}
              className="flex h-12 items-center justify-center font-bold bg-violet-500 hover:bg-violet-600 text-white text-xl rounded-lg p-2 w-full sm:w-1/2 mt-4 mx-auto"
            >
              Teacher Login
            </button>
          </div>

          <div className="w-1/2">
            <button
              onClick={(e) => loginWithGoogle(e, "student")}
              className="flex h-12 items-center justify-center font-bold bg-green-300 hover:bg-green-400 text-green-900 text-xl rounded-lg p-2 w-full sm:w-1/2 mt-4 mx-auto"
            >
              Student Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
