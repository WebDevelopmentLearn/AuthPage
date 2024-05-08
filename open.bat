@echo off
setlocal

rem Установите путь к вашему проекту здесь
set PROJECT_PATH="."
rem Запускаем проект в Visual Studio Code
code %PROJECT_PATH%
exit /b
endlocal