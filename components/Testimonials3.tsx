import Image from "next/image";
import { StaticImageData } from "next/image";
import config from "@/config";

// 3 testimonials card of customer review
const list: {
  username?: string;
  name: string;
  text: string;
  img?: string | StaticImageData;
}[] = [
  {
    username: "dennis",
    name: "Dennis Babych",
    text: "Absolutely love the simplicity and flexibility of these components! The documentation is clear and concise, making it easy to customize and integrate into any project. A real time-saver!",
    img: "https://res.cloudinary.com/spadasoft/image/upload/v1720100586/Avatar_284fa21ce8.png",
  },
  {
    username: "olivia",
    name: "Olivia",
    text: "This boilerplate has been a game-changer for my development workflow. The pre-built components are not only beautifully designed but also highly responsive. Can't recommend it enough!",
  },
  {
    username: "Noah",
    name: "Noah",
    text: "Building complex UIs has never been this straightforward. The wide range of components provided are intuitive and blend seamlessly with my design aesthetics. Great job! :D",
  },
];

// Component for rendering a single testimonial
const Testimonial = ({ i }: { i: number }) => {
  const testimonial = list[i];

  if (!testimonial) return null;

  return (
    <li key={i}>
      <figure className="relative max-w-lg h-full p-6 md:p-10 bg-[#141414] rounded-2xl max-md:text-sm flex flex-col">
        <blockquote className="relative flex-1">
          <p className="text-white leading-relaxed">{testimonial.text}</p>
        </blockquote>

        <figcaption className="relative flex items-center justify-start gap-4 pt-4 mt-4 md:gap-8 md:pt-8 md:mt-8 border-t border-base-content/5">
          <div className="w-full flex items-center justify-between gap-2">
            <div>
              <div className="font-medium text-white md:mb-0.5">
                {testimonial.name}
              </div>

              {testimonial.username && (
                <div className="mt-0.5 text-sm text-white">
                  @{testimonial.username}
                </div>
              )}
            </div>

            <div className="overflow-hidden rounded-full bg-base-300 shrink-0">
              {testimonial.img ? (
                <Image
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                  src={testimonial.img}
                  alt={`${list[i].name}'s testimonial for ${config.appName}`}
                  width={48}
                  height={48}
                />
              ) : (
                <span className="w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center text-lg font-medium bg-base-300">
                  {testimonial.name.charAt(0)}
                </span>
              )}
            </div>
          </div>
        </figcaption>
      </figure>
    </li>
  );
};

// Main component for rendering the testimonials section
const Testimonials3 = () => {
  return (
    <section id="testimonials">
      <div className="py-24 sm:py-32 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <div className="mb-8">
            <h2 className="sm:text-5xl text-4xl font-extrabold text-white">
              212 makers are already shipping faster!
            </h2>
          </div>

          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-white">
            Don&apos;t take our word for it. Here&apos;s what they have to say
            about MicroSassFast.
          </p>
        </div>

        <ul
          role="list"
          className="flex flex-col items-center lg:flex-row lg:items-stretch gap-6 lg:gap-8"
        >
          {[...Array(3)].map((e, i) => (
            <Testimonial key={i} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials3;
