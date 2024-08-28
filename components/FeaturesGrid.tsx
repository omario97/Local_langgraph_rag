import Image from "next/image";

const data = {
  title: "Raising funds / Investments",
  description:
    "No need to make a pitch deck and raise funds to build your micro SaaS",
  business: "Run your business",
  solo_text: "solo",
  other_funds: [
    {
      id: 1,
      title: "Pitch Deck",
      time: "1 month",
      image: {
        url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100585/dashboard_a398afbd0a.png",
      },
    },
    {
      id: 2,
      title: "Raising Funds",
      time: "6 months",
      image: {
        url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100585/coins_010d573dbb.png",
      },
    },
    {
      id: 3,
      title: "Coding",
      time: "12 months",
      image: {
        url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100584/code_be5d1aa9f4.png",
      },
    },
    {
      id: 4,
      title: "Testing",
      time: "14 months",
      image: {
        url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100585/search_95dd404671.png",
      },
    },
  ],
  microsaasfast_funds: [
    {
      id: 5,
      title: "Deploy",
      time: "1 hour",
      image: {
        url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100584/logo_2bc425d794.png",
      },
    },
    {
      id: 6,
      title: "Coding",
      time: "1-2 weeks",
      image: {
        url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100585/Group_1000004673_8cdf6825a2.png",
      },
    },
    {
      id: 7,
      title: "Marketing",
      time: "1 week",
      image: {
        url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100586/Group_1000004672_1_23780990db.png",
      },
    },
    {
      id: 8,
      title: "Testing",
      time: "1 week",
      image: {
        url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100585/Group_1000004671_2ad19631c5.png",
      },
    },
  ],
};

const FeaturesGridCard = ({ item, is_primary, is_last }: any) => {
  return (
    <div className="flex items-center relative">
      <div
        className={`min-w-[250px] pb-6 pt-8 px-4 min-h-full border border-[#222222] rounded-[16px] bg-[#131211] flex flex-col justify-between gap-3 relative`}
      >
        <div
          className={`flex justify-center h-full items-center ${
            !is_primary ? "mb-3" : ""
          }`}
        >
          {item?.image && (
            <Image
              src={item?.image?.url}
              alt="logo"
              width={is_primary ? 100 : 80}
              height={is_primary ? 100 : 80}
            />
          )}
        </div>
        <div>
          <p
            className={`${
              is_primary ? "text-white" : "text-[#A0A0A0]"
            }  font-inter text-xl font-bold mb-1 text-center`}
          >
            {item?.title}
          </p>
          <p
            className={`${
              is_primary ? "text-[#49C172] font-bold" : "text-[#A0A0A0]"
            } font-inter text-[15px] text-center`}
          >
            {item?.time}
          </p>
        </div>
        {!is_primary && (
          <div className="absolute bottom-[-12px] right-[-12px]">
            <Image src="/assets/cross.svg" alt="cross" width={40} height={40} />
          </div>
        )}
        {!is_last && (
          <div
            className={`absolute ${
              is_primary ? "top-3/4" : "top-1/2"
            } -right-12 z-40`}
          >
            <Image src="/assets/arrow.svg" alt="arrow" width={75} height={40} />
          </div>
        )}
      </div>
    </div>
  );
};

const FeaturesGrid = () => {
  return (
    <div className="flex justify-center items-center my-24 w-full">
      <div className="max-w-[1440px] w-full px-4">
        <div className="w-full flex flex-col items-center">
          <h2
            className={`font-inter text-[32px] sm:text-[48px] leading-[38px] sm:leading-[57px] font-bold text-center mb-4 max-w-[700px] text-transparent bg-gradient-to-r from-[#73B8FF] to-[#00458C] inline-block bg-clip-text`}
          >
            {data?.title}
          </h2>
          <p
            className={`text-[#95959D] font-inter text-base sm:text-xl text-center max-w-[600px]`}
          >
            {data?.description}
          </p>
        </div>
        <div className="flex gap-3 items-center mt-4 justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 17.92C12.8 17.7 14.35 16.95 15.65 15.65C16.95 14.35 17.7 12.8 17.92 11H14.92C14.7 12 14.24 12.84 13.54 13.54C12.84 14.24 12 14.7 11 14.92V17.92ZM8 6H12L15 9H17.92C17.67 7.05 16.79 5.38 15.27 4C13.76 2.66 12 2 10 2C8 2 6.24 2.66 4.73 4C3.21 5.38 2.33 7.05 2.08 9H5L8 6ZM9 17.92V14.92C8 14.7 7.16 14.24 6.46 13.54C5.76 12.84 5.3 12 5.08 11H2.08C2.3 12.77 3.05 14.3 4.35 15.6C5.65 16.9 7.2 17.67 9 17.92ZM10 0C12.75 0 15.1 1 17.05 2.95C19 4.9 20 7.25 20 10C20 12.75 19 15.1 17.05 17.05C15.1 19 12.75 20 10 20C7.25 20 4.9 19 2.95 17.05C1 15.1 0 12.75 0 10C0 7.25 1 4.9 2.95 2.95C4.9 1 7.25 0 10 0Z"
              fill="#52DE82"
            />
          </svg>
          <p className="font-inter text-xl text-[#95959D]">
            {data?.business}{" "}
            <span className="text-[#52DE82]">{data?.solo_text}</span>
          </p>
        </div>
        <div className="flex justify-center">
          <div className="flex gap-7 items-stretch mt-12 overflow-x-scroll pb-3 pr-3">
            {data?.other_funds?.map((item: any, index: number) => (
              <FeaturesGridCard
                key={index}
                item={item}
                is_primary={false}
                is_last={index === data?.other_funds?.length - 1 ? true : false}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex gap-7 items-stretch mt-12 overflow-x-scroll">
            {data?.microsaasfast_funds?.map((item: any, index: number) => (
              <FeaturesGridCard
                key={index}
                item={item}
                is_primary={true}
                is_last={index === data?.other_funds?.length - 1 ? true : false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesGrid;
