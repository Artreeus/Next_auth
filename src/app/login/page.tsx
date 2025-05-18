"use client";

import { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  // Clear error when inputs change
  useEffect(() => {
    if (error) setError("");
  }, [email, password]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log(`Attempting to sign in with email: ${email}`);
      
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/dashboard",
      });

      console.log("Sign in result:", result);

      if (result?.error) {
        setError(`Login failed: ${result.error}`);
        // For debugging in development
        if (process.env.NODE_ENV === "development") {
          setDebugInfo(`Full result: ${JSON.stringify(result)}`);
        }
      } else if (result?.ok) {
        console.log("Login successful, redirecting to:", result.url);
        router.push(result.url || "/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(`An error occurred: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10 w-[90%] mx-auto">
      <h1 className="text-center text-6xl mb-5 font-bold text-white">
        Admin <span className="text-teal-200">Login</span>
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

        <div className="w-[90%] mx-auto bg-white p-8 md:p-12 shadow-lg rounded-lg">
          {error && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md text-center">
              {error}
              {debugInfo && (
                <div className="mt-2 text-xs overflow-auto max-h-24">
                  {debugInfo}
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter admin email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 text-white p-3 rounded-md font-medium hover:bg-teal-600 transition duration-300 disabled:bg-teal-300"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 mb-4">Or continue with</p>
            <div className="flex justify-center gap-4">
              <button
                className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/dashboard",
                  })
                }
              >
                <Image
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                  width={30}
                  height={30}
                  alt="Google logo"
                />
              </button>

              <button
                className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
                onClick={() =>
                  signIn("github", {
                    callbackUrl: "/dashboard",
                  })
                }
              >
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
    </div>
  );
};

export default LoginPage;