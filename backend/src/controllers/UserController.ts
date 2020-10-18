import { Request, Response } from 'express';
import MailService from '../services/MailService';
import User from '../models/User';

export default {
  async store(req: Request, res: Response) {
    const { name, email } = req.body;

    try {
      const user = await User.create({ name, email });
      console.log('Usuário ' + user.email + ' criado com sucesso.');
      return res.status(201).send({ user });
    } catch (error) {
      if (error.code == 11000) {
        return res
          .status(500)
          .send({ message: 'Já existe um usuário cadastrado com esse e-mail' });
      } else if (error.errors.email) {
        return res.status(406).send({ message: 'E-mail inválido.' });
      } else {
        return res.status(500).send({
          message:
            'Erro interno do sistema, por favor verifique o corpo da requesição'
        });
      }
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const { page, limit } = req.query;
      const skip = Number(limit) * (Number(page) - 1);
      const users = await User.find()
        .sort({
          name: -1
        })
        .skip(skip)
        .limit(Number(limit));
      const total = await User.find().countDocuments();
      const pages = Math.ceil(total / Number(limit));
      console.log('Usuários listados com sucesso com sucesso.');
      return res.status(200).send({ users, pages, total });
    } catch (error) {
      return res.status(500).send({
        message:
          'Erro interno do sistema, por favor verifique o corpo da requesição'
      });
    }
  },

  async index(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        throw new Error('Usuário não encontrado.');
      }
      console.log('Usuários listados com sucesso com sucesso.');
      return res.status(200).send({ user });
    } catch (error) {
      return res.status(500).send({
        message:
          'Erro interno do sistema, por favor verifique o corpo da requesição'
      });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
      const user = await User.findOneAndUpdate({ _id: id }, { name, email });
      console.log('Usuário ' + user.email + ' editado com sucesso.');
      return res.status(200).send({ user });
    } catch (error) {
      if (error.code == 11000) {
        return res
          .status(500)
          .send({ message: 'Já existe um usuário cadastrado com esse e-mail' });
      } else if (error.errors.email) {
        return res.status(406).send({ message: 'E-mail inválido.' });
      } else {
        return res.status(500).send({
          message:
            'Erro interno do sistema, por favor verifique o corpo da requesição'
        });
      }
    }
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await User.findOneAndDelete({ _id: id });
      console.log('Usuário ' + user.email + ' deletado com sucesso.');
      return res.status(200).send({ user });
    } catch (error) {
      if (error.code == 11000) {
        return res
          .status(500)
          .send({ message: 'Já existe um usuário cadastrado com esse e-mail' });
      } else if (error.errors.email) {
        return res.status(406).send({ message: 'E-mail inválido.' });
      } else {
        return res.status(500).send({
          message:
            'Erro interno do sistema, por favor verifique o corpo da requesição'
        });
      }
    }
  },

  async shuffle(req: Request, res: Response) {
    try {
      const users = await User.find();
      for (let i = users.length - 1; i >= 0; i--) {
        console.log(i);
        const user = users[i];
        let j = Math.floor(Math.random() * (i + 1));

        MailService.sendMail({
          from: process.env.MAIL_USER,
          to: user.email,
          subject: 'Seu amigo secreto!',
          text: `Olá ${user.name}, seu amigo secreto é o ${users[j].name}, compre algo legal para seu amiga(o), tenho certeza que ela(e) irá amar!`
        });
        user.friend = users[j]._id;
        user.save();
      }

      return res.status(200).send({
        success: true,
        response: 'Sorteio e envio de emails feitos com sucesso.'
      });
    } catch (error) {
      if (error.code == 11000) {
        return res
          .status(500)
          .send({ message: 'Já existe um usuário cadastrado com esse e-mail' });
      } else {
        return res.status(500).send({
          message:
            'Erro interno do sistema, por favor verifique o corpo da requesição'
        });
      }
    }
  }
};
