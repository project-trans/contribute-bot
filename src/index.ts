/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import handle from "./handlers/handle";
import Bot from "./requests/bot";
import { TelegramUpdate } from "./types/telegram";

export interface Env {
	SECRET: string;
	BOT_TOKEN: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== env.SECRET) {
			return new Response(undefined, { status: 401 });
		}

		const bot = new Bot(env.BOT_TOKEN);
		const req = (await request.json()) as TelegramUpdate;
		if (req.message) {
			await handle.message(req.message, bot);
		}

		return new Response();
	},
};
