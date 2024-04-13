// @ts-nocheck
type Config = {
	host: string;
	serverName?: string;
	i: string;
	master?: string;
	wsUrl: string;
	apiUrl: string;
	keywordEnabled: boolean | string;
	reversiEnabled: boolean | string;
	notingEnabled: boolean | string;
	chartEnabled: boolean | string;
	serverMonitoring: boolean | string;
	checkEmojisEnabled?: boolean;
	checkEmojisAtOnce?: boolean;
	mecab?: string;
	mecabDic?: string;
	memoryDir?: string;
	localOnly?: boolean;
};

import config from '../config.json' assert { type: 'json' };

config.wsUrl = config.host.replace('http', 'ws');
config.apiUrl = config.host + '/api';

export default config as Config;
