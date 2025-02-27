import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BGImage from '@/assets/bg.png';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';

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
    <div className=" bg-[#272626] bg-center p-8 w-full min-h-screen h-full flex items-center justify-center flex-col px-[6rem] ">
      <div className="w-full text-center flex  justify-center items-center gap-[5rem]">
        <div className=" bg-[#FFF5ED] py-4 px-[3rem] w-[30%] h-[400px] text-center rounded-md ">
          <h1 className="font-bold text-2xl my-4">Tupi Mallengke</h1>
          <Separator className="bg-black" />
          <form
            onSubmit={handleLogin}
            className=" flex flex-col items-start text-start"
          >
            <Label className="my-2 text-md font-thin">Username</Label>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              className="h-[3rem] border-2 rounded-md border-black"
              type="text"
            />

            <Label className="my-2 text-md font-thin">Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              className="h-[3rem] border-2  rounded-md border-black"
              type="password"
            />

            {error && <p className="text-red-500 my-4">{error}</p>}
            <Button
              type="submit"
              className="rounded-md self-center my-4 bg-black text-white h-[3rem] w-[10rem]"
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
