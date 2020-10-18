import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 50px;
  font-family: 'Lobster' !important;
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
`;
