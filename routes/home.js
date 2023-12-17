import Router from 'koa-router';

const router = new Router({
	prefix: ''
});

router.get('/', async function(ctx) {
    await ctx.render('index');
});

export default router;