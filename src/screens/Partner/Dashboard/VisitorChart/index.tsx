import React from 'react';

import { User } from '@generated/client';

interface VisitorChartProps {
  me: User;
}

const VisitorChart = ({ me }: VisitorChartProps) => {
  return (
    <div>
      Visited by XXX People (Note: Show daily aggregated chart with
      external Charting Library)
    </div>
  );
};

export default VisitorChart;
