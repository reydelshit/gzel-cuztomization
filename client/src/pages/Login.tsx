import BackgroundImage from '@/assets/gzel.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const usernameFromEnv = import.meta.env.VITE_USERNAME;
  const passwordFromEnv = import.meta.env.VITE_PASSWORD;

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('isLoginMallengke', 'true');

    if (username === usernameFromEnv && password === passwordFromEnv) {
      console.log('login success');

      window.location.href = '/';
    } else {
      setError('Username or password is incorrect');
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="bg-center p-8 w-full min-h-screen h-full flex items-center justify-center flex-col px-[6rem] "
    >
      <div className="w-full text-center flex  justify-center items-center gap-[5rem]">
        <div className=" bg-[#74AB6E] py-4 px-[3rem] w-[25%] h-[500px] text-center items-center flex flex-col justify-center rounded-xl ">
          <h1 className="text-white font-bold text-2xl my-4">
            Online Apparel Customized Clothing
          </h1>
          <form
            onSubmit={handleLogin}
            className=" flex flex-col items-start text-start w-full"
          >
            <Input
              onChange={(e) => setUsername(e.target.value)}
              className="h-[4rem] placeholder:text-center placeholder:font-bold border-2  my-4 border-black bg-white rounded-xl text-center"
              type="text"
              placeholder="Username"
            />

            <Input
              onChange={(e) => setPassword(e.target.value)}
              className="h-[4rem] placeholder:text-center placeholder:font-bold border-2   border-black bg-white rounded-xl text-center"
              type="password"
              placeholder="Username"
            />

            <span className="block my-2 self-end text-white cursor-pointer">
              <Link to="/create">Create Account</Link>
            </span>

            {error && (
              <p className="text-red-500 bg-white p-2 w-full rounded-md my-4">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="self-center my-4 bg-white text-black  h-[3rem] w-full shadow-md rounded-xl"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
