"use client";

import { motion } from "framer-motion";
import Image from "next/image";
// import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative flex md:flex-row sm:flex-col items-center justify container mx-auto px-6 md:px-12 py-16 gap-10">
      {/* Main Content */}

      {/* Left Side - Text */}
      <div className="flex flex-col justify-center w-full md:w-1/2 mb-8 md:mb-0">
        <motion.h1
          className="text-4xl md:text-6xl font-semibold text-white mb-6"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Hi, I am<span> Mahamudul Hasan</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-white mb-8"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          I’m a passionate web developer who builds beautiful, functional
          websites.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        >
          <a
            href="https://drive.google.com/file/d/1TtktmxlqjIn9cRKbjtRxA7PJe_mXGNh9/view?usp=sharing"
            download
            className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-full text-lg transition duration-300 inline-block"
          >
            Hire Me
          </a>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        >
          <Image
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2Y1NjIwYzdlajBzNWRvZm9zNHYwMGt2Y2ZyNnlnb3Zvc3pyeGplZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/78XCFBGOlS6keY1Bil/giphy.gif"  // Replace with an actual image URL
        unoptimized
        alt="Developer Image"
        width={600}  // Adjust width as needed
        height={600}  // Adjust height as needed
        className="rounded-lg shadow-lg object-cover"  // Styling classes
      />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
