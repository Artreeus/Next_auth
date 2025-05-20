import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="w-[90%] mx-auto">
    <div className="py-20 relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 "></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-indigo-300 text-lg font-medium">Loading ...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
