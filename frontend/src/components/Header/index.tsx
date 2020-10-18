import React from 'react';
import Logo from '../Logo/Logo';

import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <>
      <Container>
        <Logo />
      </Container>
      <hr style={{ margin: 0 }} />
    </>
  );
};

export default Header;
