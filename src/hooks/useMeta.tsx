import { useSelector } from 'react-redux'

import store from '@/store'
import type { RouteType } from '@/types'
import type { RouteMetaType } from '../types'

/**
 * 获取当前路由的meta信息
 */
const useMeta = (pathnameArr: string[]) => {
  const { menuRoutes } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.userReducer,
  )

  // 从menuRoutes中找到pathnameArr的对应项
  const getMeta = (
    pathname: string,
    routes: RouteType[],
  ): RouteMetaType | undefined => {
    for (const route of routes) {
      if (route.path === pathname) {
        return route?.meta
      } else if (route?.children) {
        const meta = getMeta(pathname, route.children)
        if (meta) {
          return meta
        }
      }
    }
  }

  const metaArr: RouteMetaType & { pathname: string }[] = []
  for (const pathname of pathnameArr) {
    const meta = getMeta(pathname, menuRoutes)
    metaArr.push({
      ...meta,
      pathname,
    } as RouteMetaType & { pathname: string })
  }

  return metaArr
}

export default useMeta
