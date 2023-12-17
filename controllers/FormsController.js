import {
    handleQuerySuccess,
    handleFail
} from '../utils/handleResponse.js';
import * as FormsService from '../services/FormsService.js';

export async function get(ctx) {
    try {
        const {
            search,
        } = ctx.query

        const query = {
            search,
        }

        let forms = await FormsService.fetch(query, ctx)
        forms = forms.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        })
        handleQuerySuccess(ctx, 'success', forms)
    } catch (error) {
        console.log(error);
        handleFail(ctx, 500, 'Internal server error')
    }
}

export async function store(ctx) {
    try {
        const {
            name,
            email,
            address,
            no_hp
        } = ctx.request.body

        const body = {
            name,
            email,
            address,
            no_hp
        }
        let forms = await FormsService.create(body, ctx)
        handleQuerySuccess(ctx, 'success', forms)
    } catch (error) {
        console.log(error);
        handleFail(ctx, 500, 'Internal server error')
    }
}

export async function clear(ctx) {
    try {
        let forms = await FormsService.clear(ctx)
        handleQuerySuccess(ctx, 'success', forms)
    } catch (error) {
        console.log(error);
        handleFail(ctx, 500, 'Internal server error')
    }
}