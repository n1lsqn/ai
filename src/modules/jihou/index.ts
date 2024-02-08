import Module from '@/module.js';
import accurateInterval from 'accurate-interval';
import { bindThis } from '@/decorators.js';

export default class extends Module {
	public readonly name = 'jihou';

	@bindThis
	public install() {
		accurateInterval(this.post, 1000 * 60 * 60, { aligned: true, immediate: true });

		return {};
	}

	@bindThis
	private async post() {
		const date = new Date();
		date.setMinutes(date.getMinutes() + 1);

		const hour = date.getHours();

		switch (hour) {
			default:
				break;

			case 7:
				this.ai.post({
					text: `おはようございます！${hour}時です。学校の方もお仕事の方も、お休みの方も無理せず頑張ってください・・・！`
				});
				break;

			case 10:
				this.ai.post({
					text: `${hour}時ですよー！よい子はそろそろ寝る時間です！`
				});
				break;

			case 3:
				this.ai.post({
					text: `${hour}時です、夜更かしさんですか？藍は寝る必要がないので傍にいますよ。`
				});
				break;
		}
	}
}
