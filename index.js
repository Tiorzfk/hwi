import 'dotenv/config';
import Koa from 'koa';
import { bodyParser } from '@koa/bodyparser';
import session from 'koa-session';

import logger from 'koa-logger';
import {
    handleFail
} from './utils/handleResponse.js';

import forms from './routes/forms.js';
import home from './routes/home.js';
import cors from '@koa/cors';
import render from 'koa-ejs';
import { fileURLToPath } from 'url';
import path, {dirname} from 'path';
import serve from 'koa-static'

const app = new Koa();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(serve('./public'));

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true
});

app.keys = [process.env.SECRET];
app.use(session(app));
app.use(cors());

app.use(logger());
app.use(bodyParser());

app.use(forms.routes());
app.use(home.routes());

app.use(function(ctx){
    handleFail(ctx, 404, 'Not Found')
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});