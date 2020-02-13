import styled from 'styled-components';
import { Card } from 'antd';

export const StyledCard = styled(Card)`
  min-width: 200px;
  max-width: 300px;

  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .ant-card-body {
    flex: 1;
  }
`;

export const StyledCards = styled.div`
  margin: 16px;

  display: grid;
  align-items: center;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
  grid-gap: 16px;
`;
