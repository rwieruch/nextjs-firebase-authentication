import React from 'react';
import { Typography } from 'antd';

import Link from '@components/Link';
import Code from './Code';
import Image from './Image';

export default {
  h1: (props: any) => <Typography.Title level={1} {...props} />,
  h2: (props: any) => <Typography.Title level={2} {...props} />,
  h3: (props: any) => <Typography.Title level={3} {...props} />,
  h4: (props: any) => <Typography.Title level={4} {...props} />,
  code: (props: any) => <Code {...props} offset={354} />,
  a: (props: any) => <Link {...props} />,
  img: (props: any) => <Image {...props} />,
};
