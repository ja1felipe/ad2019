import React, { HTMLAttributes, useState } from 'react';
import { IData } from '../../types';
import Form from '../Form';

interface IProps extends HTMLAttributes<HTMLElement> {
  user?: IData;
  show: boolean;
  setShow: () => void;
  refresh?: () => void;
}

const Modal: React.FC<IProps> = (props) => {
  return (
    <div
      className='modal'
      style={{
        display: props.show ? 'flex' : 'none',
        width: '100vw',
        height: '100vh',
        alignItems: 'center'
      }}
    >
      <div className='modal-background'></div>
      <div className='modal-card'>
        <header
          className='modal-card-head'
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <button
            onClick={props.setShow}
            className='delete'
            aria-label='close'
          ></button>
        </header>
        <section className='modal-card-body' style={{ padding: 0 }}>
          <Form
            refresh={props.refresh}
            setShow={props.setShow}
            user={props.user}
          />
        </section>
      </div>
    </div>
  );
};

export default Modal;
