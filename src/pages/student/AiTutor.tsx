import {
  LifebuoyIcon,
  NewspaperIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import { useEffect } from "react";

const cards = [
  {
    name: "AI Tutoring",
    description:
      "Get personalized tutoring from our advanced AI system. We help with various subjects and provide instant assistance.",
    icon: PhoneIcon,
  },
  {
    name: "Homework Help",
    description:
      "Struggling with an assignment? Our AI can guide you step-by-step through your homework with detailed explanations.",
    icon: LifebuoyIcon,
  },
  {
    name: "Learning Resources",
    description:
      "Access a vast library of resources to enhance your learning experience, including articles, videos, and exercises.",
    icon: NewspaperIcon,
  },
];

export default function AiTutor() {
  useEffect(() => {
    // Inject Botpress chatbot script
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.1/inject.js";
    script1.async = true;

    const script2 = document.createElement("script");
    script2.src =
      "https://mediafiles.botpress.cloud/7db3b8b2-9621-4380-b60e-84858fac2485/webchat/v2.1/config.js";
    script2.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    // Cleanup to remove scripts when component unmounts
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      {/* Background image */}
      <img
        src="https://img.freepik.com/premium-vector/picture-girl-with-laptop-books_1092808-31147.jpg?w=900"
        alt="Girl with laptop and books"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      {/* Dark blue overlay with the new color */}
      <div className="absolute inset-0 bg-[#0F1454] opacity-80 -z-10"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            AI Tutor Support
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Our AI-powered tutor is here to help you succeed. Whether it's
            assignments, concepts, or learning resources, we've got you covered!
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.name}
              className="flex gap-x-4 rounded-xl bg-white/10 p-6 ring-1 ring-inset ring-white/10">
              <card.icon
                className="h-7 w-5 flex-none text-indigo-400"
                aria-hidden="true"
              />
              <div className="text-base leading-7">
                <h3 className="font-semibold text-white text-lg">
                  {card.name}
                </h3>{" "}
                {/* Thicker and larger font */}
                <p className="mt-2 text-gray-200 font-semibold">
                  {card.description}
                </p>{" "}
                {/* Lighter and thicker text */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
