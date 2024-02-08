import { FORWARD_GROUP } from "../consts";
import { getCommand } from "../helpers/common";
import Bot from "../requests/bot";
import { TelegramMessage } from "../types/telegram";
import commands from "./commands";

export default {
	async message(message: TelegramMessage, bot: Bot) {
		console.log(message);
		if (message.from.id !== message.chat.id) return;
		if (message.text && message.text.startsWith("/") && !message.forward_date) {
			const args = message.text.split(" ");
			const cmd = getCommand(args.shift() as string);
			if (commands[cmd]) {
				await commands[cmd](message, args, bot);
				return;
			}
		}

		await bot.sendMessage(FORWARD_GROUP, 'From: ' + message.from.id, {
			entities: [{
				type: 'text_mention',
				offset: 'From: '.length,
				length: message.from.id.toString().length,
				user: message.from
			}]
		});
		await bot.forwardMessage(FORWARD_GROUP, message.chat.id, message.message_id)
	},
};
