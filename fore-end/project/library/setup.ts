//加载样式
import './style/global.less';

export function setupCsg(app:any) {

    // 加载插件
    // const Plugins = import.meta.glob('./plugins/*.ts');
    const Plugins = import.meta.globEager('./plugins/*.ts');
    const keys = Object.keys(Plugins);
    // 执行批量替换操作
    for (const path of keys) {
     ( Plugins[path] as {
      setup:Function
     }).setup(app)
    }
}
