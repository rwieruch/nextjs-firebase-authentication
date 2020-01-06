import styled from 'styled-components';
import { Form } from 'antd';

const StyledFormItem = styled(Form.Item)`
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export default StyledFormItem;
