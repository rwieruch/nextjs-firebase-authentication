import React from 'react';
import { Skeleton, Table } from 'antd';

import { User, usePartnerGetSalesQuery } from '@generated/client';
import useErrorIndicator from '@hooks/useErrorIndicator';
import { formatDateTime, formatPrice } from '@services/format';

const columns = [
  {
    key: 'createdAt',
    title: 'Date',
    dataIndex: 'createdAt',
  },
  {
    key: 'courseId',
    title: 'Course ID',
    dataIndex: 'courseId',
  },
  {
    key: 'bundleId',
    title: 'Bundle ID',
    dataIndex: 'bundleId',
  },
  {
    key: 'price',
    title: 'Price',
    dataIndex: 'price',
  },
  {
    key: 'royalty',
    title: 'Royalty',
    dataIndex: 'royalty',
  },
];

interface SalesTableProps {
  me: User;
  isPartner: boolean;
}

const SalesTable = ({ me, isPartner }: SalesTableProps) => {
  if (!isPartner) {
    return null;
  }

  const { data, loading, error } = usePartnerGetSalesQuery();

  const [pagination, setPagination] = React.useState({
    total: 0,
    pageSize: 1,
    current: 0,
  });

  React.useEffect(() => {
    if (!data) {
      return;
    }

    setPagination({
      total: data.partnerGetSales.length,
      pageSize: 1,
      current: 0,
    });
  }, [data]);

  console.log(data);

  useErrorIndicator({
    error,
  });

  if (loading) return <Skeleton active />;
  if (!data) return null;

  const handleChange = (newPagination: any) => {
    setPagination({
      ...pagination,
      current: newPagination.current,
    });
  };

  const dataSource = data.partnerGetSales.map(partnerSale => ({
    ...partnerSale,
    createdAt: formatDateTime(new Date(partnerSale.createdAt)),
    price: formatPrice(partnerSale.price),
    royalty: formatPrice(partnerSale.royalty),
  }));

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      onChange={handleChange}
      loading={false}
    />
  );
};

export default SalesTable;
