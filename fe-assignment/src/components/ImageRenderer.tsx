import React from 'react';
import { CharacterDTO } from '../types/characterDTO';

const ImageRenderer: React.FC<{ value: string; data: CharacterDTO }> = ({
  value,
  data,
}) => (
  <img
    src={value}
    title={data.name}
    style={{ width: '50px', height: '50px' }}
  />
);

export default ImageRenderer;
