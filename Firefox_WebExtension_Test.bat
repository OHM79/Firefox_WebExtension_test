@echo off
chcp 65001
SET saveDirectry="%*"

set time_tmp=%time: =0%
set now=%date:/=%%time_tmp:~0,2%%time_tmp:~3,2%%time_tmp:~6,2%
SET RND=%RANDOM%

REM mkdir "test-"%now%"-"%RND%"-"%saveDirectry%
REM dir > result-%now%.txt

echo %now%:%RND% > cmdResultTest.txt
echo %0 : %1 : %2 : %3 : %4 : %5 >> cmdResultTest.txt

REM test-%now%-%saveDirectry% > result-%RND%.txt
REM pause >nul
echo %ERRORLEVEL%