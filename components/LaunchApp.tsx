import Image from "next/image";

const data = [
  {
    is_primary: false,
    image: "/launch/resend.svg",
    image_width: "70",
    title: "Emails",
    title2: "Simple emails with Resend",
    text: ["Webhook to receive & send", "DNS setup"],
    time_saved: "8 hours",
  },
  {
    is_primary: false,
    image: "/launch/stripe.svg",
    image_width: "150",
    title: "Payments",
    title2: "One time payment & Subscription with Stripe",
    text: ["Checkout sessions", "Webhooks to update user account"],
    time_saved: "32 hours",
  },
  {
    is_primary: false,
    image: "/launch/next-auth.svg",
    image_width: "100",
    title: "User Auth",
    title2: "Full auth setup with NextAuth",
    text: ["Magic link setup / Auth0", "Login with Google / FB / Apple"],
    time_saved: "16 hours",
  },
  {
    is_primary: false,
    image: "/launch/tailwind-shadcn.svg",
    image_width: "170",
    title: "UI design & Style",
    title2: "Modern UI with Shadcn & Tailwind",
    text: ["Components, animations", "20+ themes with DaisyUI"],
    time_saved: "10 hours",
  },
  {
    is_primary: false,
    image: "/launch/nextjs.svg",
    image_width: "150",
    title: "SEO",
    title2: "SSR with Next.js",
    text: ["Meta tags, sitemap, rich snippets", "SEO optimised UI components"],
    time_saved: "20 hours",
  },
  {
    is_primary: false,
    image: "/launch/strapi.svg",
    image_width: "120",
    title: "Blog",
    title2: "Blog with Strapi.io",
    text: ["SEO optimised blog", "Admin zone"],
    time_saved: "25 hours",
  },
  {
    is_primary: false,
    image: "/launch/database.svg",
    image_width: "150",
    title: "Database",
    title2: "Database with Supabase",
    text: ["PostgreSQL", "Quick setup"],
    time_saved: "2 hours",
  },
  {
    is_primary: false,
    image: "/launch/docker-vercel.svg",
    image_width: "150",
    title: "Deployment",
    title2: "Fast deployment with Docker",
    text: [
      "Next.js deployment to Vercel / AWS Amplify",
      "Docker file / config",
    ],
    time_saved: "6 hours",
  },
  {
    is_primary: true,
    image: "/launch/code.svg",
    image_width: "150",
    title: "You Own the Code",
    title2: "Open license",
    text: ["Code is your IP", "Do what you want"],
    time_saved: "ZERO Legal Headaches!",
  },
];

const DoubleTick = () => {
  return (
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
  );
};

const Card = ({ item }: any) => {
  return (
    <div
      className={`relative min-w-[285px] sm:min-w-[300px] pt-8 pb-6 px-4 min-h-[300px] border rounded-[16px] w-full h-full scale-1 hover:scale-[1.05] transition-all duration-300 ${
        !item?.is_primary ? "border-[#222222] bg-[#131211]" : "border-[#218D46]"
      }`}
    >
      <div className="flex flex-col justify-between gap-8 h-full w-full">
        <div className="flex justify-center h-full items-center">
          {item?.image && (
            <Image
              src={item?.image}
              alt="logo"
              loading="lazy"
              objectFit="cover"
              width={item?.image_width}
              height={150}
              className={`w-[${item?.image_width}px] h-auto object-cover`}
            />
          )}
        </div>
        <div>
          <p className="text-center text-white font-inter text-xl font-bold mb-3">
            {item?.title}
          </p>
          <p className="text-center text-white font-inter font-bold mb-2">
            {item?.title2}
          </p>
          {item?.text?.map((cardItem: any, index: number) => (
            <div
              key={index}
              className="flex gap-2 items-center justify-center mb-3"
            >
              <div
                className={`${
                  !item?.is_primary ? "text-[#C5C5C5]" : "text-[#fff]"
                }`}
              >
                <DoubleTick />
              </div>
              <p
                className={`${
                  !item?.is_primary ? "text-[#C5C5C5]" : "text-[#F7F7F7]"
                } font-inter text-center text-sm`}
              >
                {cardItem}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-inter font-bold text-sm py-1 px-3 rounded-full text-center text-nowrap ${
          item?.is_primary ? "bg-[#218D46]" : "bg-[#006FEE]"
        }`}
      >
        {!item?.is_primary && <span className="font-normal">Time saved –</span>}{" "}
        {item?.time_saved}
      </div>
    </div>
  );
};

const LaunchApp = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-[1440px] w-full px-4 sm:px-12 py-12 bg-launch bg-no-repeat bg-top">
        <h2 className="font-bold text-[32px] sm:text-[48px] leading-[38px] sm:leading-[57px] text-center text-white">
          Launch Your App Now,
          <br />
          <span className="text-transparent bg-gradient-to-r from-[#53DE82] to-[#389859] bg-clip-text">
            Make MONEY!
          </span>
        </h2>
        <p
          className={`text-[#95959D] font-inter text-base sm:text-xl text-center max-w-[700px] w-full mx-auto mt-4`}
        >
          This project uses modern tools and technologies that give you
          everything you need to build modern SAAS apps.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mt-12">
          {data?.map((item: any, index: number) => (
            <div key={index}>
              <Card item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LaunchApp;
