import React from 'react';

interface IconProps {
  className?: string;
}

const Icon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="white">
    <rect x="8" y="32" width="10" height="24"/>
    <rect x="24" y="24" width="10" height="32"/>
    <rect x="40" y="16" width="10" height="40"/>
    <path d="M8 32L24 24L40 16L56 20" fill="none" stroke="white" stroke-width="4"/>
    <polygon points="56,20 60,20 60,24 56,24" fill="white"/>
  </svg>
);

export default Icon;