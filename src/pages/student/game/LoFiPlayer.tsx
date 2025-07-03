import React, { useState } from "react";
import ReactPlayer from "react-player";
import './LoFiPlayer.css';

// Define the type for video links
interface VideoLink {
  id: number;
  title: string;
  url: string;
}

const LoFiPlayer: React.FC = () => {
  // Predefined YouTube video links
  const videoLinks: VideoLink[] = [
    { id: 1, title: "🎧 Chill Beats ", url: "https://www.youtube.com/watch?v=FxJ3zPUU6Y4" },
    { id: 2, title: "🌙 Rainy Night Vibes", url: "https://www.youtube.com/watch?v=DEWzT1geuPU" },
    { id: 3, title: "💫 Dreamy Lo-fi", url: "https://www.youtube.com/watch?v=lTRiuFIWV54" },
    { id: 4, title: "☕ Coffee Beats", url: "https://www.youtube.com/watch?v=zhDwjnYZiCo" },
    { id: 5, title: "🌸 Bengali Emotional Lofi", url: "https://www.youtube.com/watch?v=SsJYwq6VoLM" },
    { id: 6, title: "✨ English Lo-Fi", url: "https://www.youtube.com/watch?v=qX2KtVVeIbg" },
    { id: 7, title: "📖 Study Vibes", url: "https://www.youtube.com/watch?v=7NOSDKb0HlU" },
    { id: 8, title: "🍂 Fall Lo-fi", url: "https://www.youtube.com/watch?v=W41eBhJD32c" },
    { id: 9, title: "🎨 Creative Flow", url: "https://www.youtube.com/watch?v=gGOpElxqlQw" },
    { id: 10, title: "🌅 Sunrise Beats", url: "https://www.youtube.com/watch?v=1fueZCTYkpA" }
  ];

  // State to store the current video URL
  const [currentUrl, setCurrentUrl] = useState<string>(videoLinks[0].url);

  return (
    <div className="player-container">
      {/* Left-side Playlist */}
      <div className="playlist-container">
        <h2 className="title">🎶 Lo-Fi Playlist</h2>

        <ul className="playlist">
          {videoLinks.map((video) => (
            <li 
              key={video.id} 
              className={`playlist-item ${currentUrl === video.url ? "active" : ""}`}
              onClick={() => setCurrentUrl(video.url)}
            >
              {video.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Right-side Video Player */}
      <div className="player-wrapper">
        <ReactPlayer
          url={currentUrl}
          controls={true}
          width="100%"
          height="100%"
          playing={true}
          className="react-player"
        />
      </div>
    </div>
  );
};

export default LoFiPlayer;
