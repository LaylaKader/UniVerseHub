import {
  QuestionMarkCircleIcon,
  LightBulbIcon,
  BoltIcon,
} from "@heroicons/react/20/solid";
import { useEffect } from "react";

const faqCards = [
  {
    name: "Common Questions",
    description:
      "Get answers to the most frequently asked questions instantly using our AI-powered FAQ bot.",
    icon: QuestionMarkCircleIcon,
  },
  {
    name: "Chat Support",
    description:
      "Need further help? Engage in real-time conversations with the bot to resolve your queries quickly.",
    icon: LightBulbIcon, // Updated icon
  },
  {
    name: "24/7 Assistance",
    description:
      "Our bot is available around the clock to assist you with any inquiries you may have, day or night.",
    icon: BoltIcon, // Updated icon
  },
];

export default function FaqBot() {
  useEffect(() => {
    // Create and inject the Botpress chatbot script
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.1/inject.js";
    script1.async = true;

    const script2 = document.createElement("script");
    script2.src =
      "https://mediafiles.botpress.cloud/48256a3c-04c9-44dc-bfa3-af660f1609fb/webchat/v2.1/config.js";
    script2.async = true;

    // Append scripts to the body
    document.body.appendChild(script1);
    document.body.appendChild(script2);

    // Cleanup function to remove scripts when component unmounts
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);

      // Optionally remove the chat widget container if necessary
      const botpressWebChat = document.getElementById("bp-web-widget");
      if (botpressWebChat) {
        botpressWebChat.remove();
      }
    };
  }, []);

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      {/* Background image */}
      <img
        src="https://img.freepik.com/free-vector/tiny-people-sitting-standing-near-giant-faq_74855-7879.jpg?t=st=1726004301~exp=1726007901~hmac=476a4e8466148bd770bdc6c94e38a9283c14c8d01a0a228f3f4192d94ab5bf41&w=996"
        alt="FAQ"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      {/* Dark blue overlay */}
      <div className="absolute inset-0 bg-[#0F1454] opacity-80 -z-10"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            FAQ Bot Support
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Have questions? Our FAQ bot is here to assist you 24/7. Get instant
            answers to common questions or engage in real-time conversations for
            personalized help.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {faqCards.map((card) => (
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
