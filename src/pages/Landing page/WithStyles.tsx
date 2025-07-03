import React from "react";

interface WithStylesProps {
  description: string;
  headline: string;
  image: string;
}

const WithStyles: React.FC<WithStylesProps> = ({
  description,
  headline,
  image,
}) => {
  return (
    <div className="bg-amber-100 rounded-lg p-4 shadow-lg mb-6 mx-2 h-[400px] flex flex-col items-center">
      <img
        src={image}
        alt={headline}
        className="w-full h-2/3 object-cover rounded-lg"
        style={{ maxHeight: "300px" }} // Adjust if needed
      />
      <div className="mt-3 text-center flex-grow">
        <h3 className="text-lg font-semibold">{headline}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default WithStyles;
