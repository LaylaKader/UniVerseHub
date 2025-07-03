import { TypeAnimation } from "react-type-animation";
import Lottie from "lottie-react";
import HomeAnimation from "../../assets/Landing Page/home.json";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14 bg-[#eeac3b]">
      <div
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-[#4e9ca9] shadow-xl shadow-indigo-600/10 ring-1 ring- sm:-mr-80 lg:-mr-96"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl lg:col-span-2 xl:col-auto">
            We’re revolutionizing education for students.
          </h1>
          <div className="mt-6 text-yellow-300 text-lg font-semibold max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
            <TypeAnimation
              sequence={[
                "We provide Innovative Community-Based Learning",
                1000,
                "We provide AI-Powered Educational Tools",
                1000,
                "We provide Personalized Support for Student",
                1000,
                "We provide Collaborative Study Sessions",
                1000,
                "We provide Centralized Resource Sharing",
                1000,
                "We provide Boosting Student Engagement",
                1000,
                "We provide Fostering Peer Connections",
                1000,
              ]}
              wrapper="span"
              speed={80}
              style={{
                fontSize: "30 em",
                display: "inline-block",
               
              }}
              repeat={Infinity}
            />

            <div className="mt-10 flex items-center gap-x-6">
              <Link to="/login"
                
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Get started
              </Link>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="  mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-0">
            <Lottie animationData={HomeAnimation} loop={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
