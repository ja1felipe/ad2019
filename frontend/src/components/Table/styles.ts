import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  & .button {
    width: 30px;
    height: 30px;
    margin-left: 5px;
  }
`;

export const TableBox = styled.table`
  & th,
  & td {
    padding: 10px 20px;
  }

  & th {
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.light};
  }

  & tr {
    background: ${(props) => props.theme.colors.contrast};
    border-bottom: 1px solid ${(props) => props.theme.colors.light};
  }
  & tr:hover {
    background: ${(props) => props.theme.colors.light};
    border-bottom: 1px solid ${(props) => props.theme.colors.contrast};
  }
`;
