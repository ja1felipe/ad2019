import React, { HTMLAttributes, useState } from 'react';
import { IData } from '../../types';

import { Container, TableBox } from './styles';
import { Icon } from '@iconify/react';
import bxsTrash from '@iconify/icons-bx/bxs-trash';
import bxPencil from '@iconify/icons-bx/bx-pencil';
import theme from '../../styles/theme';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal';

interface IColumn {
  name: string;
  selector: string;
}

interface ITable extends HTMLAttributes<HTMLElement> {
  columns: IColumn[];
  data: IData[];
  refresh: (state: boolean) => void;
}

const Table: React.FC<ITable> = (props) => {
  const [deleting, setDeleting] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [selectUser, setUser] = useState<IData>();
  const history = useHistory();

  function resolvePath(path: string, obj: object, separator = '.') {
    let properties: (string | any)[] = Array.isArray(path)
      ? path
      : path.split(separator);
    return properties.reduce((prev: any, curr: any) => prev && prev[curr], obj);
  }

  function handleDelete(id: string) {
    setDeleting(true);
    api.deleteUser(id).then((res) => {
      if (res) {
        props.refresh(true);
        setDeleting(false);
      }
    });
  }

  function handleUpdate(user: IData) {
    setUser(user);
    setShow(true);
  }

  function handleShowModal(): void {
    setShow((prev) => !prev);
  }

  function handleRefresh(): void {
    props.refresh(true);
  }

  return (
    <Container>
      <Modal
        refresh={handleRefresh}
        setShow={handleShowModal}
        show={show}
        user={selectUser}
      />
      <TableBox>
        <thead>
          <tr>
            {props.columns.map((column, i) => (
              <th key={i}>
                <span>{column.name}</span>
              </th>
            ))}
            <th style={{ textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((elem, idx) => {
            return (
              <tr key={idx}>
                {props.columns.map((column, i) => {
                  let row_text = resolvePath(column.selector, elem);
                  return <td key={i}>{row_text}</td>;
                })}
                <td>
                  <button
                    onClick={() => {
                      if (elem) handleUpdate(elem);
                    }}
                    style={{ background: theme.colors.secondary }}
                    className='button'
                  >
                    <span className='icon is-small'>
                      <Icon
                        icon={bxPencil}
                        style={{
                          color: theme.colors.contrast,
                          fontSize: '20px'
                        }}
                      />
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      if (elem._id) handleDelete(elem._id);
                    }}
                    className={`button is-danger ${
                      deleting ? 'is-loading' : ''
                    }`}
                  >
                    <span className='icon is-small'>
                      {deleting ? undefined : (
                        <Icon
                          icon={bxsTrash}
                          style={{
                            color: theme.colors.contrast,
                            fontSize: '20px'
                          }}
                        />
                      )}
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </TableBox>
    </Container>
  );
};

export default Table;
