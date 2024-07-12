import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { CellValueChangedEvent, ColDef, GridOptions } from 'ag-grid-community';
import ImageRenderer from './ImageRenderer';
import ObjectRenderer from './ObjectRenderer';
import { CharacterDTO } from '../types/characterDTO';

interface DataGridProps {
  data: CharacterDTO[];
  columns: ColDef[];
  defaultColDef: ColDef;
  onEdit: (id: number, field: string, value: string) => void;
}

const DataGrid: React.FC<DataGridProps> = ({
  data,
  columns,
  defaultColDef,
  onEdit,
}) => {
  const handleEdit = (params: CellValueChangedEvent) => {
    const { id } = params.data;
    const { field } = params.colDef;
    if (field) {
      const { newValue } = params;
      onEdit(id, field, newValue);
    }
  };

  const colDefs = columns.map((col: ColDef) => {
    if (!col.field) return col;
    if (col.field === 'image') return { ...col, cellRenderer: ImageRenderer };
    if (col.field === 'origin' || col.field === 'location')
      return { ...col, cellRenderer: ObjectRenderer };
    if (col.editable)
      return {
        ...col,
        cellStyle: { backgroundColor: '#e0f7fa', cursor: 'text' },
      };
    return col;
  });

  const gridOptions: GridOptions = {
    singleClickEdit: true,
    stopEditingWhenCellsLoseFocus: true,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <AgGridReact
        rowData={data}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        onCellValueChanged={handleEdit}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 15, 20, 50]}
        domLayout="autoHeight"
        gridOptions={gridOptions}
      />
    </div>
  );
};

export default DataGrid;
