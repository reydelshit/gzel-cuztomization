import BackgroundImage from '@/assets/gzel.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Model from '@/assets/model.jpg';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

type InputType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

const CreateAccount = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleInput = (e: InputType) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_LINK}/users/create`,
        userData,
      );

      console.log(res.data, 'New user created');

      if (String(res.data.status) === 'success') {
        console.log('Account created successfully');

        toast({
          title: 'Account Created',
          description: 'Your account has been successfully created.',
        });

        setUserData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });
      }
    } catch (error) {
      console.error('Error creating account:', error);
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
      <div className="grid md:grid-cols-2 h-[40%] rounded-xl overflow-hidden">
        <div className="bg-gray-300 p-8 flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-700">GZEL</h1>
            <p className="text-gray-600">Digital Design and Printing</p>
          </div>

          <div className="flex-grow flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square rounded overflow-hidden ">
              <img
                src={Model}
                alt="Product showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <div className="w-8 h-1 bg-white rounded-full"></div>
            <div className="w-8 h-1 bg-white/50 rounded-full"></div>
            <div className="w-8 h-1 bg-white/50 rounded-full"></div>
          </div>
        </div>

        {/* Right side - Sign up form */}
        <div className="bg-[#74AB6E] p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">
              Create an account
            </h2>

            <div className="text-white mb-6">
              Already have an account?{' '}
              <Link to="/login" className="text-white font-bold">
                Login
              </Link>
            </div>

            <form onSubmit={handleCreateAccount} className="w-full">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Input
                  type="text"
                  placeholder="First name"
                  className="bg-white"
                  name="firstName"
                  required
                  onChange={handleInput}
                />
                <Input
                  type="text"
                  placeholder="Last name"
                  className="bg-white"
                  name="lastName"
                  required
                  onChange={handleInput}
                />
              </div>

              <div className="mb-4">
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-white"
                  name="email"
                  required
                  onChange={handleInput}
                />
              </div>

              <div className="mb-6">
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="bg-white"
                  name="password"
                  required
                  onChange={handleInput}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-green-500 hover:bg-gray-100 mb-6"
              >
                Create account
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
