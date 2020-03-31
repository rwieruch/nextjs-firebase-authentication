import React from 'react';
import { Skeleton, Table } from 'antd';

import { User, usePartnerSalesLazyQuery } from '@generated/client';
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

const LIMIT = 10;

const SalesTable = ({ me, isPartner }: SalesTableProps) => {
  if (!isPartner) {
    return null;
  }

  const [
    getPartnerSales,
    { loading, error, data },
  ] = usePartnerSalesLazyQuery();

  React.useEffect(() => {
    getPartnerSales({
      variables: {
        offset: 0,
        limit: LIMIT,
      },
    });
  }, []);

  const [pagination, setPagination] = React.useState({
    total: 0,
    pageSize: LIMIT,
    current: 1,
    simple: true,
  });

  React.useEffect(() => {
    if (!data) {
      return;
    }

    setPagination({
      ...pagination,
      total: data.partnerSales.pageInfo.total,
    });
  }, [data]);

  useErrorIndicator({
    error,
  });

  const handleChange = (newPagination: any) => {
    setPagination({
      ...pagination,
      current: newPagination.current,
    });

    getPartnerSales({
      variables: {
        offset: Math.round(LIMIT * newPagination.current - 1),
        limit: LIMIT,
      },
    });
  };

  const dataSource = (data?.partnerSales?.edges || []).map(
    partnerSale => ({
      ...partnerSale,
      createdAt: formatDateTime(new Date(partnerSale.createdAt)),
      price: formatPrice(partnerSale.price),
      royalty: formatPrice(partnerSale.royalty),
    })
  );

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      onChange={handleChange}
      loading={loading}
    />
  );
};

export default SalesTable;
