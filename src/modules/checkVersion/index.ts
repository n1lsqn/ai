import Module from '@/module.js';
import Message from '@/message.js';
import { bindThis } from '@/decorators.js';

type Version = {
	server: string;
	client: string;
};

export default class extends Module {
	public readonly name = 'checkVersion';

	private latest?: Version;

	@bindThis
	public install() {
		this.versionCheck();
		setInterval(this.versionCheck, 1000 * 60 * 60 * 1);

		return {
			mentionHook: this.mentionHook
		};
	}

	public versionCheck = () => {
		this.getVersion()
			.then(fetched => {
				this.log(`Version fetched: ${JSON.stringify(fetched)}`);

				if (this.latest != null && fetched != null) {
					const serverChanged = this.latest.server !== fetched.server;

					if (serverChanged) {
						const v = `${serverChanged ? '**' : ''}${this.latest.server} → ${this.mfmVersion(fetched.server)}\n${serverChanged ? '**' : ''}`;

						this.log(`Version changed: ${v}`);

						this.ai.post({ text: `${v}にアップデートされたようですよ！` });
					}
				}

				this.latest = fetched;
			})
			.catch(e => this.log(`warn: ${e}`));
	};

	@bindThis
	private async mentionHook(msg: Message) {
		if (msg.text == null) {
			return false;
		} else if (msg.includes(['サーバーバージョン', 'バージョン確認', 'バージョンチェック'])) {
			this.getVersion()
				.then(meta => {
					msg.reply(`${this.mfmVersion(meta.server)} みたいです！`);
				})
				.catch(() => {
					msg.reply(`ごめんなさい、取得に失敗したようです・・・。`);
				});
			return true;
		}
		return false;
	}

	private getVersion = (): Promise<Version> => {
		return this.ai.api('meta').then((meta: any) => {
			return {
				server: meta.version,
				client: meta.clientVersion
			};
		});
	};

	private mfmVersion = (v: string): string => { // Specify the type of 'v' as 'string'
		if (v == null) return v;
		return v.match(/^\d+\.\d+\.\d+$/) ? `[${v}](https://github.com/syuilo/misskey/releases/tag/${v})` : v;
	};

	private wait = (ms: number): Promise<void> => {
		return new Promise(resolve => {
			setTimeout(() => resolve(), ms);
		});
	};
}
