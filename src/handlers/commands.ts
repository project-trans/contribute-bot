import Bot from "../requests/bot";
import { TelegramMessage } from "../types/telegram";

export default {
	async start(message: TelegramMessage, args: string[], bot: Bot) {
		await bot.sendMessage(message.chat.id, '请直接向我发送想要投稿的内容，内容将会自动转发给 Project Trans Editors');
	},
};
