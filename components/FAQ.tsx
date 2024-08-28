"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const data = {
  title: "A frequently",
  title2: "asked questions",
  below_title: "Ship your micro SaaS in",
  below_title2: "days not weeks!",
  faqs: [
    {
      id: 1,
      question: "What do I get?",
      answer: `1. The NextJS starter with all the boilerplate code you need to run a micro SaaS startup fast: a payment system, a database, login, a blog, UI components, and much more.<br />
      The repo is available in:<br />
      - Typescript<br />
      - /app router and /pages router.<br />
      - docker container to launch on any server<br />
      - CMS for Blog and Admin Dashboard<br />
      2. The documentation helps you set up your app from scratch<br />
      3. Access to our Discord with makers & founders who build fast, share their experience, create partnerships for cross promotions and doubling the sales`,
    },
    {
      id: 2,
      question: "What tech stack inside?",
      answer:
        "Next.JS, TypeScript, PostgreSQL, Docker, NextAuth, shadcn UI, ReSend, Stripe, Strapi and more",
    },
    {
      id: 3,
      question: "Is it a website template? ",
      answer: `It's more than just a template. You can easily copy and paste website sections, including a pricing section, FAQ, and even a CMS blog. Additionally, you'll have access to a variety of UI components like buttons, modals, and animations. The NextJS starter also includes essential tools for running a micro SaaS business, such as payment processing, email integration, and SEO optimization.`,
    },
    {
      id: 4,
      question: "Why MicroSaaSFast is better than other boilerplates?",
      answer:
        "You are buying not components, you purchasing an experience to ship your micro SaaS fast and make fast money with it.",
    },
    {
      id: 5,
      question: "Are there any hidden costs?",
      answer: "Your server $5/month, MagicLink $1 per 1000 users, Stripe fee",
    },
    {
      id: 6,
      question: "Can I get a refund?",
      answer:
        "After you purchase a product you will get an immediate access to all materials, so no. But rest assure that average time to launch micro SaaS startup is 7 days and start making money.",
    },
  ],
};

const FAQ = () => {
  return (
    <div className="flex justify-center items-center py-24 w-full">
      <div className="max-w-[1440px] w-full px-4 sm:px-12 flex flex-col md:flex-row gap-8">
        <div className="flex flex-col justify-between md:min-h-full md:w-[45%] pt-5">
          <p
            className={`font-inter text-[32px] sm:text-[48px] leading-[38px] sm:leading-[57px] font-bold  text-transparent bg-gradient-to-r from-[#E437F2] to-[#853FF8] inline-block bg-clip-text`}
          >
            {data?.title} <span className="text-white">{data?.title2}</span>
          </p>
          <p
            className={`font-inter text-[32px] sm:text-[48px] leading-[38px] sm:leading-[57px] text-white font-bold pb-40 hidden md:block`}
          >
            {data?.below_title}{" "}
            <span className="text-transparent bg-gradient-to-r from-[#E437F2] to-[#853FF8] inline-block bg-clip-text">
              {data?.below_title2}
            </span>
          </p>
        </div>
        <div className="md:w-[55%]">
          <Accordion defaultValue={["item-0"]} type="multiple">
            {data?.faqs?.map((item: any, index: number) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-[#95959D] pt-6 pb-4"
              >
                <AccordionTrigger className="text-white font-inter text-start font-bold text-base hover:no-underline">
                  {item?.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#95959D] text-base font-normal">
                  <div dangerouslySetInnerHTML={{ __html: item?.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
