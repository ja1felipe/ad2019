import React, { useState } from 'react';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import api from '../../services/api';
import { ButtonBox } from './styles';
import TablePage from './TablePage';

const Home: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  function handleShowModal(): void {
    setShow((prev) => !prev);
  }

  function handleRefresh(): void {
    setRefresh((prev) => !prev);
  }

  function handleDraw(): void {
    setLoading(true);
    api.draw().then(() => {
      setLoading(false);
    });
  }

  return (
    <div>
      <Header />
      <ButtonBox>
        <button className='button' onClick={handleShowModal}>
          Cadastrar novo usuário
        </button>
        <button
          className={`button ${loading ? 'is-loading' : ''}`}
          onClick={handleDraw}
        >
          Fazer sorteio
        </button>
      </ButtonBox>
      <Modal refresh={handleRefresh} setShow={handleShowModal} show={show} />
      <TablePage extRefresh={refresh} />
    </div>
  );
};

export default Home;
