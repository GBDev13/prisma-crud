import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  async createUser (req, res) {
    try {
      const { name, email } = req.body;
  
      let user = await prisma.user.findUnique({
        where: { email }
      });
  
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      user = await prisma.user.create({
        data: { name, email }
      });
  
      return res.json(user);
    } catch (err) {
      return res.json({ error });
    }
  },

  async findAllUsers (req, res) {
    try {
      const users = await prisma.user.findMany({
        include: {
          posts: true
        }
      });

      return res.json(users);
    } catch (err) {
      return res.json({ err });
    }
  },

  async findUser (req, res) {
    try {
      const { id } = req.params;
    
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id)
        }
      });

      if (!user) return res.status(400).json({ error: "User does not exists "});

      return res.json(user);
    } catch (err) {
      return res.json({ err });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
    
      let user = await prisma.user.findUnique({
        where: {
          id: Number(id)
        }
      });

      if (!user) return res.status(400).json({ error: "User does not exists "});

      user = await prisma.user.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          email
        }
      });

      return res.json(user);
    } catch (err) {
      return res.json({ err });
    }
  },

  async deleteUser (req, res) {
    try {
      const { id } = req.params;
    
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id)
        }
      });

      if (!user) return res.status(400).json({ error: "User does not exists "});

      await prisma.user.delete({
        where: {
          id: Number(id)
        }
      });

      return res.status(200).send();
    } catch (err) {
      return res.json({ err });
    }
  },
}