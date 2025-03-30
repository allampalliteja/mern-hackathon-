import React from 'react';

function LoadingSpinner({ size = 'md' }) {
  let spinnerSizeClass = 'w-6 h-6';
  if (size === 'sm') {
    spinnerSizeClass = 'w-4 h-4';
  } else if (size === 'lg') {
    spinnerSizeClass = 'w-8 h-8';
  }

  return (
    <div className={`inline-block ${spinnerSizeClass} border-2 border-blue-500 border-t-transparent rounded-full animate-spin`}></div>
  );
}

export default LoadingSpinner;