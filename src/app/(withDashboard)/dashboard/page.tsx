import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      {session?.user && (
        <>
          <h1 className="text-4xl text-center mt-10">
            Welcome {session?.user?.name}{" "}
          </h1>
          <h1 className="text-4xl text-center mt-10">
            User Email : {session?.user?.email}{" "}
          </h1>
          <Image
            src={session?.user?.image || "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?t=st=1739136358~exp=1739139958~hmac=91870744816aff7a9123c97114fc19cfb39b1b7b0a58afca5f1f47d5e636179d&w=826"}
            alt="Image"
            height={500}
            width={500}
            className="mx-auto rounded-full mt-5"
          />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
