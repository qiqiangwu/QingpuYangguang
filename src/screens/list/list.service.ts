import {formatResponse, IFormatResponse} from '../../utils/request';
import Logger from '../../utils/logger';
import {
  FetchArticleListParams,
  getCMSarticleByCId,
} from '../../servcies/aums';
import appConfig from '../../appConfig';

const logger = Logger.get('list service');

export function fetchArticleList({
  cid,
  pageSize,
  pageIndex,
}: FetchArticleListParams) {
  return getCMSarticleByCId({cid, pageSize, pageIndex}).then(response => {
    if (!response.hasError) {
      const list = response?.data?.data?.content;
      const totalPage = response?.data?.data?.totalPage;
      if (Array.isArray(list)) {
        return formatResponse({
          hasError: false,
          data: {
            list: list.map(item => ({
              id: item.id,
              image: `${appConfig.serverPath}${item.articleImage}`,
              title: item.text,
              date:
                item.fupdatetime === 'null' ? item.faddtime : item.fupdatetime,
            })),
            totalPage,
          },
        });
      }
    }

    return formatResponse({
      ...response,
      message: '获取文章列表失败',
    });
  });
}
