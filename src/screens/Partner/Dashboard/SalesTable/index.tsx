import React from 'react';
import { Table } from 'antd';

import { User } from '@generated/client';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    gender: 'female',
    email: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    gender: 'male',
    email: '10 Downing Street',
  },
];

const columns = [
  {
    key: 'date',
    title: 'Date',
    dataIndex: 'date',
  },
  {
    key: 'courseId',
    title: 'Course ID',
    dataIndex: 'courseId',
    width: '20%',
  },
  {
    key: 'bundleId',
    title: 'Bundle ID',
    dataIndex: 'bundleId',
    width: '20%',
  },
  {
    key: 'grossAmount',
    title: 'Gross Amount',
    dataIndex: 'grossAmount',
  },
  {
    key: 'netAmount',
    title: 'Net Amount',
    dataIndex: 'email',
  },
];

interface SalesTableProps {
  me: User;
}

const SalesTable = ({ me }: SalesTableProps) => {
  const [pagination, setPagination] = React.useState({
    total: dataSource.length,
    pageSize: 1,
    current: 0,
  });

  const handleChange = (newPagination: any) => {
    setPagination({
      ...pagination,
      current: newPagination.current,
    });
  };

  return (
    <Table
      bordered
      title={() => 'Partner Sales'}
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      onChange={handleChange}
      loading={false}
    />
  );
};

export default SalesTable;
