import React from 'react';

import { User } from '@generated/client';

import VisitorChart from './VisitorChart';
import SalesTable from './SalesTable';

interface DashboardProps {
  me: User;
  isPartner: boolean;
}

const Dashboard = ({ me, isPartner }: DashboardProps) => {
  if (!isPartner) {
    return null;
  }

  return (
    <>
      <div>
        <VisitorChart me={me} />
      </div>
      <div>
        <SalesTable me={me} />
      </div>
    </>
  );
};

export default Dashboard;
