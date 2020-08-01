import React from "react";
import { encode } from "js-base64";
import { setCookie } from "../../utils/cookies";
import Router from "next/router";

function Login() {
  const emailRef = React.useRef<string>("");
  const passwordRef = React.useRef<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const request = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current,
          password: passwordRef.current,
        }),
      });
      const response = await request.json();
      const data = encode(JSON.stringify(response.data));

      setCookie("mas1ManagementAdmin", data);
      Router.push("/dashboard");
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="w-full flex flex-row h-screen overflow-hidden">
      <div className="flex flex-0-6 bg-white">
        <form
          onSubmit={onSubmit}
          className="w-full self-center rounded px-8 pt-8 pl-24 pr-24 pb-8"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              onChange={(e) => (emailRef.current = e.target.value)}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              onChange={(e) => (passwordRef.current = e.target.value)}
              type="password"
              placeholder="******************"
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-1 bg-gray-600">
        <div className="w-full self-center rounded px-8 pt-8 pl-24 pr-24 pb-8">
          <p className="font-extrabold text-4xl text-white">
            Administrador más1
          </p>
          <p className="text-white">Gestiona tus canchas y reservas</p>
          <button className="border text-white font-bold py-2 px-4 rounded mt-4">
            Solicitar cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
