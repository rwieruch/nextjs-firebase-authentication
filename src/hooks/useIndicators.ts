import React from 'react';
import { message } from 'antd';

export default ({
  key,
  loading,
  error,
}: {
  key: string;
  loading: boolean;
  error?: { message?: string };
}) => {
  React.useEffect(() => {
    if (loading) {
      message.loading({
        content: 'Loading ...',
        key: key,
        duration: 0,
      });
    }
  }, [loading]);

  React.useEffect(() => {
    if (error) {
      let text = error?.message || 'Something went wrong ...';
      text = text.replace('GraphQL error: ', '');

      message.error({
        content: text,
        key: key,
        duration: 2,
      });
    }
  }, [error]);

  return () =>
    message.success({
      content: 'Success!',
      key: key,
      duration: 2,
    });
};
