'use client'
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const techLogos = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg", alt: "HTML Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg", alt: "CSS Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", alt: "Tailwind CSS Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", alt: "ReactJS Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg", alt: "NextJS Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png", alt: "ExpressJS Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg", alt: "NodeJS Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg", alt: "HTML Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg", alt: "CSS Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", alt: "Tailwind CSS Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", alt: "ReactJS Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg", alt: "NextJS Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png", alt: "ExpressJS Logo" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg", alt: "NodeJS Logo" }
];

const InfiniteCarousel = () => {
  return (
    <div className="relative overflow-hidden w-full h-40 rounded-2xl shadow-md my-10 ">
      <motion.div
        className="flex w-max h-full space-x-6"
        animate={{ x: [0, -2000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {techLogos.concat(techLogos).map((logo, index) => (
          <Card
            key={index}
            className="flex items-center justify-center w-32 h-32 p-2 bg-glassmorphism shadow-lg rounded-xl"
          >
            <CardContent className="flex items-center justify-center mt-5">
              <Image src={logo.src} alt={logo.alt} width={64} height={64} />
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteCarousel;
