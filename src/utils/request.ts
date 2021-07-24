/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend, RequestOptionsInit } from 'umi-request';
import { notification } from 'antd';
import { history as router } from 'umi';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  // 201: '服务器错误',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = (codeMessage as any)[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }
  return response;
};

// export const prefix =
//   process.env.NODE_ENV === 'development' ? '' : 'http://47.104.131.14/digitcons/v1';

export const prefix = 'http://47.104.131.14/wisdomsite/v1';
// export const prefix = 'http://39.104.81.4/wisdomsite/v1'

// export const prefix = 'http://www.lanlan.live:8085/wisdomsite/v1'
/**
 * 配置request请求时的默认参数
 */
export const urequest = extend({
  prefix: prefix,
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

export const request = (url: string, options?: RequestOptionsInit) => {
  return new Promise<any>(async (resolve, reject) => {
    const res = await urequest(url, options);
    if (res === null) {
      reject('未知错误');
      return;
    }
    const error = handleStatusError(res.status, url, res.message);

    if (error) reject(error);

    const boxingRes = boxingResponse(res);
    resolve(boxingRes);
  }).catch((error) => {
    throw error;
  });
};

const handleStatusError = (status: number, url?: string, msg?: string): string | undefined => {
  const errorConfig = (BACKENDSTATUSERRORCONFIG as any)[status] || undefined;
  if (Array.isArray(errorConfig)) {
    const [defaultMsg, fn] = errorConfig;
    if (typeof fn === 'function') {
      fn(msg || defaultMsg, url);
    }
    return msg;
  }

  return errorConfig;
};

const boxingResponse = (res: any) => {
  const data = res.data;
  if (data && data.pageTool) {
    const pageTool = data.pageTool;
    return {
      dataList: data.beanList || [],
      meta: {
        pageNum: pageTool.pageNum,
        pageSize: pageTool.pageTool,
        total: pageTool.totalSize,
      },
    };
  }
  return res;
};

const BACKENDSTATUSERRORCONFIG = {
  125: [
    'token error!',
    () => {
      router.push('/user/login');
    },
  ],
  201: [
    '后台服务器异常请查阅日志!',
    (errorText: string, url: string) => {
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    },
  ],
  116: [
    '项目进度id不能为空',
    (errorText: string, url: string) => {
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    },
  ],
  121: [
    '',
    (errorText: string, url: string) => {
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    },
  ],
  10: ['', ''],
};

// 中间件，对请求前、响应后做处理
urequest.use(async (ctx, next) => {
  const { req } = ctx;

  req.options.headers = {
    auth_token: 'd7dda732508242669ba1c1506935b1e8',
  };

  await next();
  const { res } = ctx;

  // if (process.env.NODE_ENV === 'development') {
  //   console.log(`API: ${req.url.replace(prefix, '')} \r\n返回的数据: `, res.data, ' \r\n');
  //   console.log(`\r\n`);
  // }
});

export default request;
