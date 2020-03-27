import React from 'react';

import { User } from '@generated/client';

interface DashboardProps {
  me: User;
  isPartner: boolean;
}

const Dashboard = ({ me, isPartner }: DashboardProps) => {
  if (!isPartner) {
    return null;
  }

  return <p>Times Visited</p>;
};

export default Dashboard;
