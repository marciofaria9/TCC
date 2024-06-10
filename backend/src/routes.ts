import { Router } from 'express';
import multer from 'multer';

//user
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'

//cateegory
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'

//product
import { CreateProductController } from './controllers/product/CreateProductController'
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

import { CreateOrderController } from './controllers/Order/CreateOrderController';
import { RemoveOrderController } from './controllers/Order/RemoveOrderController';
import { AddItemController } from './controllers/Order/AddItemController';
import { RemoveItemController } from './controllers/Order/RemoveItemController';
import { SendOrderController } from './controllers/Order/SendOrderController';
import { ListOrderController } from './controllers/Order/ListOrderController';
import { DetailOrderCrontroller } from './controllers/Order/DetailOrderCrontroller';
import { FinishOrderController } from './controllers/Order/FinishOrderController'

import { ListTodayOrdersController } from './controllers/results/ListTodayOrdersController';
import { ListMonthPizzasController } from './controllers/results/ListMonthPizzasController';


import { isAuthenticated } from './middlewares/isAuthenticated'

import uploadConfig from './config/multer'

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//USER 
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated,  new DetailUserController().handle )

//CATEGORY
router.post('/category', isAuthenticated, new CreateCategoryController().handle )
router.get('/category', isAuthenticated, new ListCategoryController().handle )

//PRODUCT
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle )
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle )

//ORDER
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle )
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/orders', isAuthenticated, new ListOrderController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderCrontroller().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle )

//RESULTS
router.get('/order/today', isAuthenticated, new ListTodayOrdersController().handle)
router.get('/order/pizza/month', isAuthenticated, new ListMonthPizzasController().handle)


export { router }; 