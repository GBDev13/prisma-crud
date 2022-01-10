import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  async createPost(req, res) {
    try {
      const { content } = req.body;
      const { id } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(id)} });

      if(!user) {
        return res.json({ error: "User does not exists "});
      }

      const post = await prisma.post.create({
        data: {
          content,
          userId: user.id
        },
        include: {
          author: true
        }
      });

      return res.json(post);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async findAllPosts (req, res) {
    try {
      const posts = await prisma.post.findMany({
        include: {
          author: true
        }
      });

      return res.json(posts);
    } catch (err) {
      return res.json({ err });
    }
  },

  async findPost (req, res) {
    try {
      const { id } = req.params;
    
      const post = await prisma.post.findUnique({
        where: {
          id: Number(id)
        }
      });

      if (!post) return res.status(400).json({ error: "Post does not exists "});

      return res.json(post);
    } catch (err) {
      return res.json({ err });
    }
  },

  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;
    
      let post = await prisma.post.findUnique({
        where: {
          id: Number(id)
        }
      });

      if (!post) return res.status(400).json({ error: "Post does not exists "});

      post = await prisma.post.update({
        where: {
          id: Number(id)
        },
        data: {
          content
        }
      });

      return res.json(post);
    } catch (err) {
      return res.json({ err });
    }
  },

  async deletePost (req, res) {
    try {
      const { id } = req.params;
    
      const post = await prisma.post.findUnique({
        where: {
          id: Number(id)
        }
      });

      if (!post) return res.status(400).json({ error: "Post does not exists "});

      await prisma.post.delete({
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