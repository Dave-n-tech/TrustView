import React, { useState } from "react";
import { LoginForm } from "../../components/user/LoginForm";

export const LoginPage = () => {
  const [isBusiness, setIsBusiness] = useState(false);

  return (
    <section className="container mx-auto max:h-screen">
      <h2 className="text-3xl text-PrimaryBlue font-bold text-center mt-8">
        {isBusiness ? "Log in to business account" : "Log in Below"}
      </h2>
      <LoginForm isBusiness={isBusiness}/>
      <p
        className="text-center mt-8 hover:cursor-pointer hover:underline text-blue-600"
        onClick={() => {
          setIsBusiness(!isBusiness);
        }}
      >
        {!isBusiness ? "Are you a business?" : "Are you a user?"}
      </p>
    </section>
  );
};
