import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="w-[90%] mx-auto mt-24">
      <Image
        src="https://media.geeksforgeeks.org/wp-content/uploads/20230802153215/Error-404.png"
        width={500}
        height={500}
        alt="not found page"
        className="w-full"
      />
    </div>
  );
};

export default NotFoundPage;
