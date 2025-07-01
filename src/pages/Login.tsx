import React from "react";
import { Button } from "../components/ui/Button";

const Login = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />

          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <Button label="Login"/>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
