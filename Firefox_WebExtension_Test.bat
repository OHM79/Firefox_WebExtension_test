@echo off
chcp 65001
SET saveDirectry="%*"

set time_tmp=%time: =0%
set now=%date:/=%%time_tmp:~0,2%%time_tmp:~3,2%%time_tmp:~6,2%
SET RND=%RANDOM%

REM フォルダを作成する処理
dir > test-%now%-%RND%.txt

REM cmdResultTest.txtを作成し中見を更新する
REM echo %now%:%RND% > cmdResultTest.txt
REM echo %0 : %1 : %2 : %3 : %4 : %5 >> cmdResultTest.txt

REM test-%now%-%saveDirectry% > result-%RND%.txt
REM pause >nul
echo %ERRORLEVEL%