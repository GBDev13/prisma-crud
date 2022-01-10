import { Router } from 'express';
import PostsController from './controllers/PostsController';
import UsersController from './controllers/UsersController';

const router = Router();

router.post("/user", UsersController.createUser);
router.get("/users", UsersController.findAllUsers);
router.get("/users/:id", UsersController.findUser);
router.put("/users/:id", UsersController.updateUser);
router.delete("/user/:id", UsersController.deleteUser);

router.post("/post/user/:id", PostsController.createPost);
router.get("/posts", PostsController.findAllPosts);
router.get("/posts/:id", PostsController.findPost);
router.put("/posts/:id", PostsController.updatePost);
router.delete("/post/:id", PostsController.deletePost);

export { router };