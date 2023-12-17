export function fetch(params, ctx) {
    return new Promise((resolve, reject) => {
        try {
            var huawei_forms = ctx.session.huawei_forms || []
            resolve(huawei_forms);
        } catch (error) {
            reject(error)
        }
    })
    
}

export function create (data, ctx) {
    return new Promise((resolve, reject) => {
        try {
            data.created_at = new Date()
            var huawei_forms = ctx.session.huawei_forms || []
            huawei_forms.push(data)

            ctx.session.huawei_forms = huawei_forms
            resolve(data);
        } catch (error) {
            reject(error)
        }
    })
}

export function clear (ctx) {
    return new Promise((resolve, reject) => {
        try {
            ctx.session.huawei_forms = []
            resolve(ctx.session.huawei_forms);
        } catch (error) {
            reject(error)
        }
    })
}