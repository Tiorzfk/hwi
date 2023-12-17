import Router from 'koa-router';
import * as FormsController from '../controllers/FormsController.js';

const router = new Router({
	prefix: '/api/forms'
});

router.post('/', FormsController.store);
router.post('/clear', FormsController.clear);
router.get('/', FormsController.get);

export default router;