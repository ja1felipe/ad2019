import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export const FormBox = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  & label {
    text-transform: uppercase;
    font-size: 13px;
  }

  & h1 {
    text-align: center;
    font-size: 40px;
    font-family: 'Lobster' !important;
    margin-bottom: 15px;
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const Input = styled.input`
  padding: 5px;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.secondary + '82'};
  background: none;
  color: ${(props) => props.theme.colors.dark};
  margin-bottom: 25px;
  font-size: 12px;
  width: 220px;
  &:focus {
    border: none;
    outline: none;
    border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

export const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  & label {
    text-transform: uppercase;
    font-size: 13px;
  }
`;

export const Button = styled.button`
  background: ${(props) => props.theme.colors.secondary + 'e0'};
  color: ${(props) => props.theme.colors.light};
  padding: 10px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
  width: 100% !important;
  height: 100% !important;

  &:disabled {
    background: ${(props) => props.theme.colors.secondary};
  }

  &:hover {
    background: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.light};
  }
`;
