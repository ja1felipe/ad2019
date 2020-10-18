import axios from 'axios';
import { store } from 'react-notifications-component';
import { IData } from '../types';

const connection = axios.create({ baseURL: 'https://apiad2019.herokuapp.com' });

interface IDataRes {
  pages: number;
  data: IData[];
}

const api = {
  fetchUsers(page: number): Promise<IDataRes> {
    return new Promise((resolve, reject) => {
      connection
        .get(`/users?page=${page}&limit=5`)
        .then((res) => {
          console.log(res);
          resolve({ data: res.data.users, pages: res.data.pages });
        })
        .catch((error) => {
          console.log(error.response);
          store.addNotification({
            title: 'Falha!',
            message: 'Erro ao listar usuários.',
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
          });
        });
    });
  },

  getUser(id: string): Promise<IData> {
    return new Promise((resolve, reject) => {
      connection
        .get(`/users/${id}`)
        .then((res) => {
          console.log(res);
          resolve(res.data.user);
        })
        .catch((error) => {
          console.log(error.response);
          store.addNotification({
            title: 'Falha!',
            message: 'Erro ao buscar usuário.',
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
          });
        });
    });
  },

  deleteUser(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      connection
        .delete(`/users/${id}`)
        .then((res) => {
          console.log(res);
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
          console.log(error.response);
          store.addNotification({
            title: 'Falha!',
            message: 'Erro ao deletar usuários.',
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
          });
        });
    });
  },

  createUser(data: IData): Promise<boolean> {
    return new Promise((resolve, reject) => {
      connection
        .post(`/users/`, data)
        .then((res) => {
          console.log(res);
          store.addNotification({
            title: 'Sucesso!',
            message: 'Usuário criado com sucesso.',
            type: 'success',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: {
              duration: 6000,
              onScreen: true
            }
          });
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
          console.log(error.response);
          store.addNotification({
            title: 'Falha!',
            message: 'Falha ao criar usuário.',
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
          });
        });
    });
  },

  updateUser(id: string, data: IData): Promise<boolean> {
    return new Promise((resolve, reject) => {
      connection
        .put(`/users/${id}`, data)
        .then((res) => {
          console.log(res);
          store.addNotification({
            title: 'Sucesso!',
            message: 'Usuário editado com sucesso.',
            type: 'success',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
          });
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
          console.log(error.response);
          store.addNotification({
            title: 'Falha!',
            message: 'Falha ao editar usuário.',
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
          });
        });
    });
  },

  draw(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      connection
        .post(`/users/shuffle`)
        .then((res) => {
          console.log(res);
          store.addNotification({
            title: 'Sucesso!',
            message: 'Usuário sorteado e emails enviados com sucesso.',
            type: 'success',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: {
              duration: 6000,
              onScreen: true
            }
          });
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
          console.log(error.response);
          store.addNotification({
            title: 'Falha!',
            message: 'Falha ao sortear usuário.',
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
          });
        });
    });
  }
};

export default api;
