import React from "react";

interface MemoryCardProps {
  id: number;
  emoji: string;
  isFlipped: boolean;
  handleClick: (id: number) => void;
  className?: string;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ id, emoji, isFlipped, handleClick, className }) => {
  return (
    <div className={`card ${isFlipped ? "flipped" : ""} ${className}`} onClick={() => handleClick(id)}>
      {isFlipped ? emoji : "?"}
    </div>
  );
};

export default MemoryCard;
