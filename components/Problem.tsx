import Image from "next/image";

const data = {
  title: "Intellectual Property & Code ownership ",
  description:
    "We are doing the same thing what GitLab is doing. Everything belongs to you. Code is yours. You own all rights. Zero issues with your IP and future exit. ",
  comparison: [
    {
      id: 1,
      name: "Bubble IO, WebFlow, Adalo",
      description: "They own the code",
      scalable: "not scalable",
      is_primary: false,
      image: {
        url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100584/logo_Line_6e7ccdc5fd.png",
      },
    },
    {
      id: 2,
      name: "Micro SaaS Fast",
      description: "You are the code owner",
      scalable: "scalable",
      is_primary: true,
      image: {
        url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100584/thumbnail_logo_Circle_40ca763e8f.png",
      },
    },
  ],
};

const ProblemCard = ({ item }: any) => {
  return (
    <div className={`min-h-[300px] flex flex-col`}>
      <div className="flex justify-center h-full items-center">
        {item?.image && (
          <Image src={item?.image?.url} alt="logo" width={220} height={100} />
        )}
      </div>
      <div>
        <p className="text-[#D6D6DE] font-inter text-center text-xl mb-5">
          {item?.name}
        </p>
        <div className="flex gap-1 items-center justify-center">
          <p className={`text-[#D6D6DE] font-inter text-[15px]`}>
            {item?.description}
          </p>
          <p
            className={`${
              !item?.is_primary ? "text-[#D66850]" : "text-[#49C172]"
            } font-inter font-bold text-[15px]`}
          >
            / {item?.scalable}
          </p>
        </div>
      </div>
    </div>
  );
};

const Problem = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-[1440px] w-full px-4 pt-32">
        <div className="w-full flex flex-col items-center">
          <h2
            className={`font-inter text-[32px] sm:text-[48px] leading-[38px] sm:leading-[57px] font-bold text-center mb-4 text-white max-w-[600px]`}
          >
            {data?.title}
          </h2>
          <p
            className={`text-[#95959D] font-inter text-base sm:text-xl text-center max-w-[600px]`}
          >
            {data?.description}
          </p>
        </div>
        <div className="flex gap-10 sm:gap-16 items-stretch justify-center mt-12 flex-wrap">
          {data?.comparison?.map((item: any, index: number) => (
            <ProblemCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Problem;
