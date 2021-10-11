import KoaRouter from "koa-router";
import createModel from "./model.js";

const router = new KoaRouter({prefix: "/medicine"});
const model = await createModel();

const mutateCtx = (ctx, status, error) => {
    ctx.status = status;
    error ? ctx.body = {"error": error} : null;
};

router.get('/get_active', async (ctx) => {

    if(ctx.query.subs.length == 0){
        mutateCtx(ctx, 400, "Empty search");
        return;
    };

    model.paramsHandler(ctx.query.subs) ? mutateCtx(ctx, 400, "Invalid characters in parameter") : mutateCtx(ctx, 200);

    if(ctx.status == 400){
        return;
    };

    //search for substances in model
    let result = await model.searchSubs(ctx.query.subs.trim());

    //handler for not found results
    if(result.length == 0) {
        mutateCtx(ctx, 404, "Active product not found");
        return;
    };

    ctx.body = result;
});

router.get('/get_name', async (ctx) => {

    if(ctx.query.name.length == 0){
        mutateCtx(ctx, 400, "Empty search");
        return;
    };

    //parameters handler for special characters
    model.paramsHandler(ctx.query.name) ? mutateCtx(ctx, 400, "Invalid characters in parameter") : mutateCtx(ctx, 200);
    
    if(ctx.status == 400){
        return;
    };
    
    //search for Name in model
    let result = await model.searchName(ctx.query.name.trim());

    //handler for not found results
    if(result.length == 0) {
        mutateCtx(ctx, 404, "Name not found");
        return;
    };

    ctx.body = result;
});

router.get('/get_ggrem', async (ctx) => {

    if(ctx.query.ggrem.length == 0){
        mutateCtx(ctx, 400, "Empty search");
        return;
    };

    //parameters handler for ggrem code
    model.ggremParamHandler(ctx.query.ggrem) ? mutateCtx(ctx, 400, "Invalid characters in parameter or incorrect number of characters (Ggrem patterns are only 15 numbers)") : mutateCtx(ctx, 200);

    if(ctx.status == 400){
        return;
    };
    
    //search for Name in model
    let result = await model.searchGgrem(ctx.query.ggrem.trim())

    //handler for not found results
    if(result.length == 0) {
        mutateCtx(ctx, 404, "Ggrem code not found");
        return
    };

    ctx.body = result;
});

router.get('/get_eans', async (ctx) => {

    if(ctx.query.ean.length == 0){
        mutateCtx(ctx, 400, "Empty search");
        return;
    };

    //parameters handler for ggrem code
    model.eanParamHandler(ctx.query.ean) ? mutateCtx(ctx, 400, "Invalid characters in parameter or incorrect number of characters (Ean patterns are only 13 numbers)") : mutateCtx(ctx, 200)

    if(ctx.status == 400){
        return;
    };
    
    //search for Name in model
    let result = await model.searchEan(ctx.query.ean.trim());

    //handler for not found results
    if(result.length == 0) {
        mutateCtx(ctx, 404, "Ean code not found");
        return;
    };

    ctx.body = result;
});

export default router.middleware();