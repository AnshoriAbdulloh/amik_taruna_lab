import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await login(email, password);

      if (user.role === "teknisi") {
        navigate("/technician");
      } else {
        navigate("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  return (
    <div className='p-5 space-y-3'>
      <input
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        className='border p-2 w-full'
      />
      <input
        type='password'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        className='border p-2 w-full'
      />

      <button
        onClick={handleLogin}
        className='bg-blue-500 text-white px-4 py-2'
      >
        Login
      </button>
    </div>
  );
}
