"use client";
import Image from "next/image";
import Link from "next/link";
import ButtonSignin from "./ButtonSignin";

const data = {
  website_name: "MicroSaaSFast",
  links: [
    {
      link: "#pricing",
      title: "Pricing",
    },
    {
      link: "/blog",
      title: "Blog",
    },
    {
      link: "/tos",
      title: "Terms of services",
    },
    {
      link: "/privacy-policy",
      title: "Privacy policy",
    },
  ],
  description: "Ship your startup in days, not weeks",
  copyright: "Copyright © 2024 - All rights reserved",
  logo: {
    url: "https://res.cloudinary.com/spadasoft/image/upload/v1720100584/logo_2bc425d794.png",
  },
};

const Footer = () => {
  return (
    <div className="flex justify-center items-center w-full bg-black">
      <div className="max-w-[1440px] w-full flex justify-between items-center flex-col md:flex-row gap-16 md:gap-4 px-4 sm:px-12 py-6 border-t border-[#1F1F1F]">
        <div className="order-last md:order-first">
          <Link href="/" className="flex items-center mb-4">
            {data?.logo && (
              <Image src={data?.logo?.url} width={40} height={40} alt="logo" />
            )}
            <p className="text-white text-[15px] font-bold font-inter">
              {data?.website_name}
            </p>
          </Link>
          <p className="font-inter text-xs text-[#D4D4D4]">
            {data?.description}
          </p>
          <p className="font-inter text-xs text-[#D4D4D4]">{data?.copyright}</p>
        </div>
        <div className="">
          <div className={`flex md:items-center flex-col md:flex-row gap-8`}>
            {data?.links?.map((item: any, index: number) => (
              <Link
                key={index}
                href={item?.link}
                className={`text-[15px] text-white text-center font-inter cursor-pointer hover:text-primary`}
              >
                {item?.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="order-first md:order-last">
          <ButtonSignin text="Login" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
