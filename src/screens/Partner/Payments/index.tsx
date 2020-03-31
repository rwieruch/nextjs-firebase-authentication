import React from 'react';
import { Table } from 'antd';

import { User, usePartnerPaymentsQuery } from '@generated/client';
import useErrorIndicator from '@hooks/useErrorIndicator';
import { formatPrice, formatMonth } from '@services/format';

const columns = [
  {
    key: 'createdAt',
    title: 'Month',
    dataIndex: 'createdAt',
  },
  {
    key: 'royalty',
    title: 'Royalty',
    dataIndex: 'royalty',
  },
];

interface PaymentsTableProps {
  me: User;
  isPartner: boolean;
}

const PaymentsTable = ({ me, isPartner }: PaymentsTableProps) => {
  if (!isPartner) {
    return null;
  }

  const { loading, error, data } = usePartnerPaymentsQuery();

  useErrorIndicator({
    error,
  });

  const dataSource = (data ? data.partnerPayments : []).map(
    partnerPayment => ({
      createdAt: formatMonth(new Date(partnerPayment.createdAt)),
      royalty: formatPrice(partnerPayment.royalty),
    })
  );

  return (
    <Table
      rowKey="createdAt"
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={false}
    />
  );
};

export default PaymentsTable;
