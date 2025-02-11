"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react"
import { loginUser } from "@/utils/actions/loginUser";import type { Metadata } from 'next'
 
// either Static metadata
export const metadata: Metadata = {
  title: 'Login Page',
}

export type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
   try {
         const res = await loginUser(data);
         console.log(res)
        if (res.accessToken){
         alert(res.message);
         localStorage.setItem('accessToken',res.accessToken)
         router.push("/");
        }
       } catch (err: any) {
         console.error(err.message);
         throw new Error(err.message);
       }
  };

  return (
    <div className="my-10 w-[90%] mx-auto">
      <h1 className="text-center text-6xl mb-5 font-bold text-white">
        Please Login <span className="text-teal-200">Here</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
        <div>
          <Image
            src="https://static.vecteezy.com/system/resources/previews/016/659/015/large_2x/3d-phone-with-a-user-account-to-log-into-the-website-on-transparent-background-free-png.png"
            width={500}
            height={200}
            alt="login page"
            className="w-full h-auto"
          />
        </div>

        <div className="w-[80%] mx-auto bg-white p-16 shadow-lg rounded-lg">
          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm  sm:text-sm"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm  sm:text-sm"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full border border-teal-500 text-teal-500 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-teal-500 hover:text-black"
              >
                Login
              </button>
            </div>
          </form>

          <p className="text-center mt-4 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-teal-500 hover:underline">
              Create an account
            </Link>
          </p> */}

          <p className="text-center  text-2xl text-gray-500 ">
            Sign Up Using <span> Google</span> or <span>Github</span>
          </p>

          {/* Social Login Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"onClick={()=>signIn("google",{
              callbackUrl:"http://localhost:3000/dashboard"
            })}>
              <Image
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                width={30}
                height={30}
                alt="Google logo"
              />
            </button>
            
            <button className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200" onClick={()=>signIn("github",{
              callbackUrl:"http://localhost:3000/dashboard"
            })}>
              <Image
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                width={25}
                height={25}
                alt="GitHub logo"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
