// VideoModal.jsx
import React from 'react';
import './VideoModal.css';

const VideoModal = ({ videoUrl, onClose }) => {
  const videoId = new URL(videoUrl).searchParams.get("v");

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal" onClick={(e) => e.stopPropagation()}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube Video"
        />
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default VideoModal;
