import { Router } from 'express';
import { AuthRouter } from '../modules/auth/auth.route';
import { CategoryRouter } from '../modules/category/category.route';
import { BrandRouter } from '../modules/brand/brand.route';

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
  {
    path: '/brand',
    router: BrandRouter,
  },
];

routes.map((route) => MainRouter.use(route.path, route.router));

export default MainRouter;
