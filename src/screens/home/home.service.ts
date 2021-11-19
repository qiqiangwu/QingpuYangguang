import {formatResponse, IFormatResponse} from '../../utils/request';
import Logger from '../../utils/logger';
import {
  FetchArticleListParams,
  getCMSarticleByCId,
  queryChildrenColumnById,
} from '../../servcies/aums';
import appConfig from '../../appConfig';

const logger = Logger.get('home service');

export interface TopAd {
  image: string;
}
export interface Column {
  icon: string;
  name: string;
  id: number;
}

export function fetchColumns(cid: number, level: number) {
  return queryChildrenColumnById({cid, level}).then(response => {
    if (!response.hasError) {
      const homeData = response?.data?.data?.children?.[0];

      if (Array.isArray(homeData?.children)) {
        // 头部广告
        const topAdImageList = homeData.children.find(
          (a: any) => a.columnName === '头部广告位',
        )?.imgList;
        const topAds = Array.isArray(topAdImageList)
          ? topAdImageList.map((item: any) => ({
              image: `${appConfig.serverPath}${item.src}`,
            }))
          : [];

        // 主栏目
        const columns = homeData.children.find(
          (a: any) => a.columnName === '子栏目',
        )?.children;
        const nav = Array.isArray(columns)
          ? columns
              .map(item => {
                return {
                  icon: `${appConfig.serverPath}${item.icon.src}`,
                  name: item.columnName,
                  id: item.id,
                };
              })
              .slice(0, 8)
          : [];

        // 通知公告
        const notice = homeData.children.find(
          (a: any) => a.columnName === '通知公告',
        );

        return formatResponse({
          hasError: false,
          data: {
            topAds,
            nav,
            notice,
          },
        });
      }
    }

    return formatResponse({
      ...response,
      message: '获取首页栏目失败',
    });
  });
}

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
