/**
 * 默认配置
 */
export interface DefaultConfig {
  appName: string;
  axiosTimeout: number;
  axiosCookie: boolean;
  axiosBaseUrl: string;
  enableSentry: boolean;
  serverPath: string;
  data: {
    home: {
      id: number;
      level: number;
    };
  };
}

const appConfig: DefaultConfig = {
  appName: '阳光宝贝幼儿园',
  axiosTimeout: 10000,
  axiosCookie: false,
  axiosBaseUrl: 'http://219.233.221.231:38080',
  enableSentry: false,
  serverPath: 'http://219.233.221.231:38080',
  data: {
    home: {
      // 栏目id
      id: 1272,
      level: 5,
    },
  },
};

export default appConfig;
