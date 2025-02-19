
import React from 'react';

interface VideoPlayerProps {
  title: string;
  src: string;
}

const VideoPlayer = ({ title, src }: VideoPlayerProps) => {
  return (
    <div className="w-full aspect-video mb-8 rounded-lg overflow-hidden shadow-lg">
      <iframe
        title={title}
        className="w-full h-full"
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
