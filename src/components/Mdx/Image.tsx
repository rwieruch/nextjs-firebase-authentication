import React from 'react';

const Image = (props: any) => {
  return (
    <img
      {...props}
      style={{ ...(props.style ?? {}), maxWidth: '100%' }}
    />
  );
};

export default Image;
