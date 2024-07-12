import React from 'react';
import { Typography, Link } from '@mui/material';
import CustomTooltip from './CustomTooltip';
import { customObj } from '../types/characterDTO';

const ObjectRenderer: React.FC<{ value: customObj | null }> = ({ value }) => {
  if (!value || !value.url) {
    return value?.name || 'Unknown';
  }
  const { name, url } = value;
  return (
    <CustomTooltip
      placement="top"
      title={
        <div>
          <Typography variant="body2">{name}</Typography>
          <Link href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </Link>
        </div>
      }
    >
      <span style={{ cursor: 'help' }}>Hover for details</span>
    </CustomTooltip>
  );
};

export default ObjectRenderer;
