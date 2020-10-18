import React, { ChangeEvent, HTMLAttributes, useEffect, useState } from 'react';

import Spinner from '../../../components/Spinner';
import Table from '../../../components/Table';
import api from '../../../services/api';
import { IData } from '../../../types';
import { TableBox, PaginationBox } from './styles';
interface IProp extends HTMLAttributes<HTMLElement> {
  extRefresh?: boolean;
}
const TablePage: React.FC<IProp> = (props) => {
  const [data, setData] = useState<IData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pages, setPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [refresh, setRefresh] = useState<boolean>(false);

  const columns = [
    {
      name: 'Nome',
      selector: 'name'
    },
    {
      name: 'E-mail',
      selector: 'email'
    }
  ];

  useEffect(() => {
    setLoading(true);
    api.fetchUsers(page).then((res) => {
      setData(res.data);
      setPages(res.pages);
      setLoading(false);
    });
    setRefresh(false);
  }, [page, refresh, props.extRefresh]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : data.length > 0 ? (
        <TableBox>
          <Table refresh={setRefresh} columns={columns} data={data} />
        </TableBox>
      ) : (
        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 25 }}>
          Nenhum usuário cadastrado ainda, aproveite e cadastre um novo :D
        </div>
      )}
      {data.length > 0 && (
        <PaginationBox>
          <button
            onClick={() => setPage((prev) => prev - 1)}
            className={`button`}
            disabled={page < 2 ? true : false}
          >
            Anterior
          </button>
          <select
            className='select'
            value={page}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setPage(Number(e.target.value))
            }
          >
            {Array.from(Array(pages), (e, i) => {
              return (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <button
            disabled={page === pages ? true : false}
            onClick={() => setPage((prev) => prev + 1)}
            className='button'
          >
            Próximo
          </button>
        </PaginationBox>
      )}
    </>
  );
};

export default TablePage;
