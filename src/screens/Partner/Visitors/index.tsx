import React from 'react';
import { Skeleton } from 'antd';
import { ResponsiveCalendar } from '@nivo/calendar';

import useErrorIndicator from '@hooks/useErrorIndicator';
import {
  User,
  VisitorByDay,
  usePartnerVisitorsQuery,
} from '@generated/client';

interface VisitorChartProps {
  me: User;
  isPartner: boolean;
}

const formatDateForChart = (date: Date) =>
  date.toISOString().split('T')[0];

const VisitorChart = ({ me, isPartner }: VisitorChartProps) => {
  if (!isPartner) {
    return null;
  }

  const startOfLastYearDate = new Date(
    new Date().getFullYear() - 1,
    0,
    1,
    12
  );
  const endOfYearDate = new Date(
    new Date().getFullYear(),
    11,
    31,
    12
  );

  const { data, loading, error } = usePartnerVisitorsQuery({
    variables: {
      from: startOfLastYearDate,
      to: endOfYearDate,
    },
  });

  useErrorIndicator({
    error,
  });

  if (loading) return <Skeleton active />;
  if (!data) return null;

  const chartData = data.partnerVisitors.map(
    (value: VisitorByDay) => ({
      day: formatDateForChart(new Date(value.date)),
      value: value.count,
    })
  );

  return (
    <div
      style={{
        height: '320px',
        width: '100%',
      }}
    >
      <ResponsiveCalendar
        data={chartData}
        from={formatDateForChart(startOfLastYearDate)}
        to={formatDateForChart(endOfYearDate)}
        emptyColor="#eeeeee"
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left',
          },
        ]}
      />
    </div>
  );
};

export default VisitorChart;
