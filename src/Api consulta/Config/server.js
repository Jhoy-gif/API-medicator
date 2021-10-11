import Koa from "koa";
import routes from "./routes.js";
import json from "koa-json";
import cors from "@koa/cors"
export default async function createServer() {

    const app = new Koa();
    
    app.use(json());
    
    app.use(cors());
    
    app.use(routes);
    
    app.use(function (ctx) {
        ctx.body = {
            "error": "Invalid URL"
        };
    })

    return app
}