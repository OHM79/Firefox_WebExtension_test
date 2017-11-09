@echo off
echo Hello,world!

set time_tmp=%time: =0%
set now=%date:/=%%time_tmp:~0,2%%time_tmp:~3,2%%time_tmp:~6,2%
SET RND=%RANDOM%

mkdir "test-"%now%"-"%RND%
REM pause >nul
