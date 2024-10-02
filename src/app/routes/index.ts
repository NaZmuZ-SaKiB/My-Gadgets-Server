import { Router } from 'express';
import { AuthRouter } from '../modules/auth/auth.route';
import { CategoryRouter } from '../modules/category/category.route';
import { BrandRouter } from '../modules/brand/brand.route';
import { MediaRouter } from '../modules/media/media.route';
import { ProductRouter } from '../modules/product/product.route';
import { BranchRouter } from '../modules/branch/branch.route';
import { SettingsRouter } from '../modules/settings/settings.route';
import { ReviewRouter } from '../modules/review/review.route';
import { ShippingAddressRouter } from '../modules/shippingAddress/shippingAddress.route';
import { OrderRouter } from '../modules/order/order.route';
import { UserRouter } from '../modules/user/user.route';

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
    path: '/user',
    router: UserRouter,
  },
  {
    path: '/product',
    router: ProductRouter,
  },
  {
    path: '/review',
    router: ReviewRouter,
  },
  {
    path: '/category',
    router: CategoryRouter,
  },
  {
    path: '/brand',
    router: BrandRouter,
  },
  {
    path: '/media',
    router: MediaRouter,
  },
  {
    path: '/branch',
    router: BranchRouter,
  },
  {
    path: '/settings',
    router: SettingsRouter,
  },
  {
    path: '/shipping-address',
    router: ShippingAddressRouter,
  },
  {
    path: '/order',
    router: OrderRouter,
  },
];

routes.map((route) => MainRouter.use(route.path, route.router));

export default MainRouter;
