import React, {
  ChangeEvent,
  useState,
  FormEvent,
  useEffect,
  HTMLAttributes
} from 'react';
import validator from 'validator';
import api from '../../services/api';
import { IData } from '../../types';

import {
  Container,
  FormBox,
  Input,
  InputGroup,
  Fields,
  Button
} from './styles';

interface IProps extends HTMLAttributes<HTMLElement> {
  user?: IData;
  setShow: () => void;
  refresh?: () => void;
}

const Form: React.FC<IProps> = (props) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (props.user && props.user._id) {
      setLoading(true);
      api.getUser(props.user._id).then((res: IData) => {
        setName(res.name);
        setEmail(res.email);
        setLoading(false);
      });
    }
  }, [props.user]);

  function validateForm() {
    if (name === '' || email === '') {
      return false;
    }

    if (!validator.isEmail(email)) {
      return false;
    }

    return true;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    let data: IData = {
      name,
      email
    };
    if (!props.user) {
      api.createUser(data).then((res) => {
        if (res) {
          setLoading(false);
          props.setShow();
          props.refresh && props.refresh();
          clearFields();
        }
      });
    } else if (props.user._id) {
      api.updateUser(props.user._id, data).then((res) => {
        if (res) {
          setLoading(false);
          props.setShow();
          props.refresh && props.refresh();
          clearFields();
        }
      });
    }
  }

  function clearFields() {
    setName('');
    setEmail('');
  }

  return (
    <Container>
      <FormBox
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          handleSubmit(e);
        }}
      >
        {props.user ? (
          <h1>Editar usuário</h1>
        ) : (
          <h1>Cadastro de novo usuário</h1>
        )}
        <Fields>
          <InputGroup>
            <label htmlFor='name'>name</label>
            <Input
              id='name'
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              placeholder='ex: João Paulo'
              type='text'
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor='email'>E-mail</label>
            <Input
              id='email'
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder='ex: joao@email.com'
              type='email'
            />
          </InputGroup>
        </Fields>
        <Button
          type='submit'
          disabled={!validateForm()}
          title={
            validateForm()
              ? ''
              : 'Por favor preencha todos os campos corretamente.'
          }
          className={`button ${loading ? 'is-loading' : ''}`}
        >
          {props.user ? 'Editar' : 'Criar'}
        </Button>
      </FormBox>
    </Container>
  );
};

export default Form;
