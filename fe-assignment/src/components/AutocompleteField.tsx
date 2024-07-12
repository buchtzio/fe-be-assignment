import React, { SyntheticEvent } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';

interface AutocompleteFieldProps {
  label: string;
  value: string | null;
  options: string[];
  onChange: (
    event: SyntheticEvent<Element, Event> | null,
    newValue: string | null,
  ) => void;
  style?: React.CSSProperties;
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
  label,
  value,
  options,
  onChange,
  style,
}) => {
  return (
    <Box mb={2} sx={{ ...style }}>
      <Autocomplete
        options={options}
        freeSolo
        value={value}
        onChange={(event, newValue) =>
          onChange(event as SyntheticEvent<Element, Event> | null, newValue)
        }
        inputValue={value || ''}
        style={{ width: '100%' }}
        onInputChange={(_, newInputValue) => onChange(null, newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              ...params.InputProps,
              sx: {
                height: '40px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
              },
            }}
          />
        )}
        getOptionLabel={(option) => option}
      />
    </Box>
  );
};

export default AutocompleteField;
