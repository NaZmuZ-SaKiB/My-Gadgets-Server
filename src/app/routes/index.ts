import { Router } from 'express';
import { AuthRouter } from '../modules/auth/auth.route';
import { CategoryRouter } from '../modules/category/category.route';

const MainRouter = Router();

type TRoute = {
  path: string;
  router: Router;
};

const routes: TRoute[] = [
  {
    path: '/auth',
    router: AuthRouter,
  },
  {
    path: '/category',
    router: CategoryRouter,
  },
];

routes.map((route) => MainRouter.use(route.path, route.router));

export default MainRouter;
