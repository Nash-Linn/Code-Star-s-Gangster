export function setupCsg(app:any) {
    // 加载插件
    // const Plugins = import.meta.glob('./plugins/*.ts');
    const Plugins = import.meta.globEager('./plugins/*.ts');
   
    const keys = Object.keys(Plugins);
    // 执行批量替换操作
    for (const path of keys) {
     // 裁剪字符串方式得到路径中的文件名（无扩展名）
      const name = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.ts'));
      // 对原对象执行添加新的属性并删除旧属性达到处理效果
      // Plugins[name].setup(app)
      console.log('Plugins[name]',Plugins[name])
    }
}
