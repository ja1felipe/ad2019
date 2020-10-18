import React from 'react';

import { Container, Title } from './styles';
import { Icon } from '@iconify/react';
import bxHappyHeartEyes from '@iconify/icons-bx/bx-happy-heart-eyes';
import theme from '../../styles/theme';

const Logo: React.FC = () => {
  return (
    <Container>
      <Title>Amigo Secreto</Title>
      <Icon
        icon={bxHappyHeartEyes}
        style={{ color: theme.colors.secondary, fontSize: '70px' }}
      />
    </Container>
  );
};

export default Logo;
