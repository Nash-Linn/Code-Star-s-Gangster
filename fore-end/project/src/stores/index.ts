/**
 * @description 导入所有 pinia 模块
 */
import { createPinia } from 'pinia'
const pinia = createPinia()

export function setupStore(app:any) {
  app.use(pinia)
}

export default pinia
