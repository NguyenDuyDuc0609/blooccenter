import React from 'react'
import { Header } from '../components/Header'
import bgImage from '../components/assets/OIP.jpg';

export const Homepage = () => {
    const style = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '70vh',
    width: '100%',
  };

  return (
    <div style={style}>
    </div>
  );
};

