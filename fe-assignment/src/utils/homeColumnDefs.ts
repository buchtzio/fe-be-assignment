import { ColDef, ValueGetterParams } from 'ag-grid-community';
import { useMemo } from 'react';

export const useHomeColumnDefs = (isAdmin: boolean): ColDef[] => {
  return useMemo(
    () => [
      { field: 'name', headerName: 'Name', flex: 2 },
      { field: 'species', headerName: 'Species', editable: isAdmin },
      { field: 'status', headerName: 'Status', editable: isAdmin },
      { field: 'gender', headerName: 'Gender', editable: isAdmin },
      ...(isAdmin
        ? [
            {
              field: 'origin',
              headerName: 'Origin',
              valueGetter: (params: ValueGetterParams) => params.data.origin,
              minWidth: 150,
            },
            {
              field: 'location',
              headerName: 'Location',
              valueGetter: (params: ValueGetterParams) => params.data.location,
              minWidth: 150,
            },
          ]
        : []),
      { field: 'image', headerName: 'Image' },
    ],
    [isAdmin],
  );
};
