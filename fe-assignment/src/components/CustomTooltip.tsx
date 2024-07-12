import { Tooltip, TooltipProps } from '@mui/material';
import { styled } from '@mui/system';

interface CustomTooltipProps extends TooltipProps {
  className?: string;
}

const CustomTooltip = styled(({ className, ...props }: CustomTooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: 'white',
    color: 'black',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    fontSize: '14px',
  },
});

export default CustomTooltip;
