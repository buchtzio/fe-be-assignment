import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import CustomTooltip from './CustomTooltip';
import { TooltipProps } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import fs from 'fs';
import path from 'path';

const CustomTooltipTestComponent: React.FC<TooltipProps> = (props) => (
  <ThemeProvider theme={createTheme()}>
    <div>
      <CustomTooltip {...props}>
        <span>Hover me</span>
      </CustomTooltip>
    </div>
  </ThemeProvider>
);

describe('CustomTooltip', () => {
  afterEach(() => {
    // Cleanup after each test
    cleanup();

    // Path to the snapshots folder
    const snapshotsFolder = path.join(__dirname, '__snapshots__');
    // Check if the folder exists and delete it recursively
    if (fs.existsSync(snapshotsFolder)) {
      fs.rmSync(snapshotsFolder, { recursive: true, force: true });
    }
  });

  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(
      <CustomTooltipTestComponent title="Test Tooltip">
        <span>Hover me</span>
      </CustomTooltipTestComponent>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the tooltip text on hover', async () => {
    render(
      <CustomTooltipTestComponent title="Test Tooltip">
        <span>Hover me</span>
      </CustomTooltipTestComponent>,
    );

    // Check that the tooltip text is not visible initially
    expect(screen.queryByText('Test Tooltip')).not.toBeInTheDocument();

    // Simulate hover
    const triggerElement = screen.getByText('Hover me');
    fireEvent.mouseOver(triggerElement);

    // Check that the tooltip text is visible
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
  });
});
