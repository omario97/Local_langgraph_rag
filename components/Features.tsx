import Image from "next/image";

const data = {
  title: "Money Saving",
  description:
    "You don’t have to invest an arm and a leg into your micro SaaS business",
  money_comparison: [
    {
      id: 1,
      is_primary: false,
      name: "Software dev agency",
      price: "$10k - $20k",
      image: {
        url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100584/Laptop_95306220d0.png",
      },
    },
    {
      id: 2,
      is_primary: false,
      name: "No code tools",
      price: "$34 to $160",
      image: {
        url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100584/icons_f8414bdf04.png",
      },
    },
    {
      id: 3,
      is_primary: true,
      name: "Micro SaaS Fast",
      price: "one time payment $250",
      image: {
        url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100588/logo_5bba7300b9.svg",
      },
    },
  ],
};

const Features = () => {
  return (
    <div className="flex justify-center items-center w-full py-24">
      <div className="max-w-[1440px] w-full px-4 sm:px-8">
        <div className="w-full flex flex-col items-center">
          <h2
            className={`font-inter text-[32px] sm:text-[48px] leading-[38px] sm:leading-[57px] font-bold text-center mb-4 text-white max-w-[600px]"
        }`}
          >
            {data?.title}
          </h2>
          <p
            className={`text-[#95959D] font-inter text-base sm:text-xl text-center max-w-[600px]`}
          >
            {data?.description}
          </p>
        </div>
        <div className="flex gap-8 sm:gap-12 items-stretch justify-center mt-12 flex-wrap">
          {data?.money_comparison?.map((item: any, index: number) => (
            <div
              key={index}
              className={`max-w-[350px] scale-1 hover:scale-[1.05] transition-all duration-300 w-full min-w-[300px] py-6 px-4 min-h-[300px] rounded-[16px] bg-[#131211] flex flex-col justify-between gap-3 ${
                !item?.is_primary ? "" : "border border-[#FEE826]"
              }`}
            >
              <div className="flex justify-center h-full items-center">
                {item?.image && (
                  <Image
                    src={item?.image?.url}
                    alt="logo"
                    loading="lazy"
                    objectFit="cover"
                    width={150}
                    height={150}
                    className={`w-[150px] h-auto object-cover`}
                  />
                )}
              </div>
              <div>
                <p className="text-[#D6D6DE] font-inter text-xl">
                  {item?.name}
                </p>
                <div className="flex gap-1 items-center">
                  <p
                    className={`${
                      !item?.is_primary ? "text-[#D66850]" : "text-[#49C172]"
                    } font-inter font-bold text-xl`}
                  >
                    {item?.price}
                  </p>
                  {!item.is_primary && (
                    <p className="text-[#D6D6DE] font-inter text-xl">/ month</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
