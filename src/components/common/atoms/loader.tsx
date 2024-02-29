import React from 'react';
const Loading = ({ style = 'dots' }: { style?: 'dots' | 'spinner' }) => {
  return (
    <div className="loader-wrapper ">
      <div className={`loader ${style}`}></div>
    </div>
  );
};

export default Loading;
