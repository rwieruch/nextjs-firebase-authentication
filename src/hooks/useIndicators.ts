import React from 'react';
import { message } from 'antd';

export default ({
  key,
  loading,
  error,
}: {
  key: string;
  loading?: boolean;
  error?: { message?: string };
}) => {
  let destroyMessage = React.useRef(() => {});

  React.useEffect(() => {
    if (loading) {
      destroyMessage.current = message.loading({
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

      destroyMessage.current = message.error({
        content: text,
        key: key,
        duration: 2,
      });
    }
  }, [error]);

  const successMessage = () => {
    destroyMessage.current = message.success({
      content: 'Success!',
      key: key,
      duration: 2,
    });
  };

  return { successMessage, destroyMessage };
};
