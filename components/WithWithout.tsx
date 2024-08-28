const data = {
  title: "Speed",
  description:
    "No need to write the SaaS wrapper code anymore, just add your idea script inside and run your micro SaaS now",
  comparison: [
    {
      title: "Software development",
      is_primary: false,
      text: [
        {
          text: "Login - 8 hours",
        },
        {
          text: "Email - 8 hours",
        },
        {
          text: "Payments - 40 hours",
        },
        {
          text: "SEO - 20 hours",
        },
        {
          text: "Design - 20 hours",
        },
      ],
    },
    {
      title: "Micro SaaS Fast",
      is_primary: true,
      text: [
        {
          text: "Login",
        },
        {
          text: "Email",
        },
        {
          text: "Payments",
        },
        {
          text: "SEO",
        },
        {
          text: "Design",
        },
      ],
    },
  ],
};

const SpeedCard = ({ item }: any) => {
  return (
    <div
      className={`relative min-w-[300px] pb-8 pt-6 px-4 min-h-full border rounded-[16px] w-full h-full scale-1 hover:scale-[1.05] transition-all duration-300 ${
        !item?.is_primary ? "border-[#222222]" : "border-[#49C172] bg-[#131211]"
      }`}
    >
      <div>
        <p className="text-center text-white font-inter text-xl font-bold mb-4">
          {item?.title}
        </p>
        {item?.text?.map((cardItem: any, index: number) => (
          <div
            key={index}
            className="flex gap-2 items-center justify-center mb-3"
          >
            <div
              className={`${
                !item?.is_primary ? "text-[#95959D]" : "text-[#fff]"
              }`}
            >
              <svg
                width="23"
                height="13"
                viewBox="0 0 23 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.70711 6.29302C6.31658 5.90249 5.68342 5.90249 5.29289 6.29302C4.90237 6.68354 4.90237 7.3167 5.29289 7.70723L6.70711 6.29302ZM10.9497 11.9499L10.2426 12.657C10.6332 13.0475 11.2663 13.0475 11.6568 12.657L10.9497 11.9499ZM22.2639 2.05038C22.6544 1.65987 22.6544 1.0267 22.2639 0.63617C21.8734 0.245637 21.2402 0.245624 20.8497 0.63614L22.2639 2.05038ZM1.75691 6.34331C1.36639 5.95278 0.733222 5.95278 0.342698 6.34331C-0.0478264 6.73383 -0.0478264 7.367 0.342698 7.75752L1.75691 6.34331ZM5.29245 12.7073C5.68297 13.0978 6.31613 13.0978 6.70666 12.7073C7.09718 12.3167 7.09718 11.6836 6.70666 11.2931L5.29245 12.7073ZM17.3131 2.10066C17.7037 1.71014 17.7037 1.07697 17.3131 0.686448C16.9226 0.295924 16.2895 0.295924 15.8989 0.686448L17.3131 2.10066ZM10.5956 5.98975C10.2051 6.38027 10.2051 7.01344 10.5956 7.40396C10.9862 7.79449 11.6193 7.79449 12.0098 7.40396L10.5956 5.98975ZM5.29289 7.70723L10.2426 12.657L11.6569 11.2428L6.70711 6.29302L5.29289 7.70723ZM11.6568 12.657L22.2639 2.05038L20.8497 0.63614L10.2427 11.2427L11.6568 12.657ZM0.342698 7.75752L5.29245 12.7073L6.70666 11.2931L1.75691 6.34331L0.342698 7.75752ZM15.8989 0.686448L10.5956 5.98975L12.0098 7.40396L17.3131 2.10066L15.8989 0.686448Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <p
              className={`${
                !item?.is_primary ? "text-[#95959D]" : "text-[#F7F7F7]"
              } font-inter text-center text-sm`}
            >
              {cardItem?.text}
            </p>
          </div>
        ))}
      </div>
      {item?.is_primary && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-[#49C172] text-white font-inter font-bold text-[22px] py-1 px-3 rounded-full">
          1 hour
        </div>
      )}
    </div>
  );
};

const WithWithout = () => {
  return (
    <div className="flex justify-center items-center pt-24 sm:pt-32 w-full">
      <div className="max-w-[1440px] w-full px-4 sm:px-12">
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
        <div className="flex gap-10 items-center justify-center mt-12 flex-wrap">
          {data?.comparison?.map((item: any, index: number) => (
            <div key={index}>
              <SpeedCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WithWithout;
