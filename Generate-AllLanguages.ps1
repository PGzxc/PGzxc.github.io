Write-Host "=========================================" -ForegroundColor Green
Write-Host "开始生成所有语言版本的网站..." -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

Write-Host "1. 生成中文版本..." -ForegroundColor Cyan
Write-Host "清理临时文件..." -ForegroundColor Yellow
& npx hexo clean
if ($LASTEXITCODE -eq 0) {
    Write-Host "清理完成，开始生成中文版本..." -ForegroundColor Yellow
    & npx hexo generate
    if ($LASTEXITCODE -eq 0) {
        Write-Host "中文版本生成完成！" -ForegroundColor Green
    } else {
        Write-Host "中文版本生成失败！" -ForegroundColor Red
    }
} else {
    Write-Host "清理失败！" -ForegroundColor Red
}

Write-Host "`n2. 生成英文版本..." -ForegroundColor Cyan
Write-Host "清理临时文件..." -ForegroundColor Yellow
& npx hexo clean --config _config.yml,_config.en.yml
if ($LASTEXITCODE -eq 0) {
    Write-Host "清理完成，开始生成英文版本..." -ForegroundColor Yellow
    & npx hexo generate --config _config.yml,_config.en.yml
    if ($LASTEXITCODE -eq 0) {
        Write-Host "英文版本生成完成！" -ForegroundColor Green
    } else {
        Write-Host "英文版本生成失败！" -ForegroundColor Red
    }
} else {
    Write-Host "清理失败！" -ForegroundColor Red
}

Write-Host "`n3. 生成日文版本..." -ForegroundColor Cyan
Write-Host "清理临时文件..." -ForegroundColor Yellow
& npx hexo clean --config _config.yml,_config.ja.yml
if ($LASTEXITCODE -eq 0) {
    Write-Host "清理完成，开始生成日文版本..." -ForegroundColor Yellow
    & npx hexo generate --config _config.yml,_config.ja.yml
    if ($LASTEXITCODE -eq 0) {
        Write-Host "日文版本生成完成！" -ForegroundColor Green
    } else {
        Write-Host "日文版本生成失败！" -ForegroundColor Red
    }
} else {
    Write-Host "清理失败！" -ForegroundColor Red
}

Write-Host "`n=========================================" -ForegroundColor Green
Write-Host "所有语言版本生成完成！" -ForegroundColor Green
Write-Host "可以执行 'npx hexo server' 启动本地服务器进行预览" -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Green

# 等待用户按键
Write-Host "`n按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')