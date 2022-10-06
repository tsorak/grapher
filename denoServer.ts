import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";

const app = new Application();

app.use(async (context, next) => {
	try {
		await context.send({
			root: `${Deno.cwd()}/public`,
			index: "index.html",
		});
	} catch {
		await next();
	}

	//log
	const url = new URL(context.request.url);
	console.log(`IN ${url.pathname}`);
	console.log(`OUT ${Deno.cwd()}/public${url.pathname}`);
});

await app.listen({ port: 3000 });
