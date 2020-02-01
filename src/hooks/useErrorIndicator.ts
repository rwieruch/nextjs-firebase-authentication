import React from 'react';
import { message } from 'antd';

export default ({ error }: { error?: { message?: string } }) => {
  React.useEffect(() => {
    if (error) {
      let text = error?.message || 'Something went wrong ...';
      text = text.replace('GraphQL error: ', '');

      message.error({
        content: text,
        duration: 2,
      });
    }
  }, [error]);
};
