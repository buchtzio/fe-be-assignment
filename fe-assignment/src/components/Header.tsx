import { Box, Typography, Button } from '@mui/material';

interface HeaderProps {
  title: string;
  showButton?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showButton = false,
  buttonLabel = '',
  onButtonClick,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        {title}
      </Typography>
      {showButton && (
        <Button variant="contained" color="primary" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      )}
    </Box>
  );
};

export default Header;
