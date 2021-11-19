import {Get} from '../utils/request';

/**
 * 获取栏目
 * @param cid 栏目id
 * @param level 栏目级别
 */
export function queryChildrenColumnById({
  cid,
  level,
}: {
  cid: number;
  level: number;
}) {
  return Get('/EMSP_CMS/queryChildrenColumnById', {
    cId: cid,
    level,
  });
}

export interface FetchArticleListParams {
  cid: number;
  pageSize: number;
  pageIndex: number;
}
/**
 * 获取栏目下文章列表
 * @param cid 栏目
 * @param pageSize 单页数量
 * @param pageIndex 当前页
 */
export function getCMSarticleByCId({
  cid,
  pageSize,
  pageIndex,
}: FetchArticleListParams) {
  return Get('/EMSP_CMS/getCMSarticleByCId', {
    cId: cid,
    pageSize,
    currentPage: pageIndex,
  });
}
