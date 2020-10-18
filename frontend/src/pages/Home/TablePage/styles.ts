import styled from 'styled-components';

export const TableBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;

export const PaginationBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & button,
  & select {
    margin: 5px;
    height: 30px !important;
  }
`;
