@echo off
echo =========================================
echo 开始生成所有语言版本的网站...
echo =========================================

echo 1. 生成中文版本...
npx hexo clean
echo 清理完成，开始生成中文版本...
npx hexo generate
echo 中文版本生成完成！

echo. 
echo 2. 生成英文版本...
npx hexo clean --config _config.yml,_config.en.yml
echo 清理完成，开始生成英文版本...
npx hexo generate --config _config.yml,_config.en.yml
echo 英文版本生成完成！

echo. 
echo 3. 生成日文版本...
npx hexo clean --config _config.yml,_config.ja.yml
echo 清理完成，开始生成日文版本...
npx hexo generate --config _config.yml,_config.ja.yml
echo 日文版本生成完成！

echo. 
echo =========================================
echo 所有语言版本生成完成！
echo 可以执行 npx hexo server 启动本地服务器进行预览
echo =========================================
pause