Option Explicit
' テスト的に作成したがどうも動作しない

' For i = 0 To WScript.Arguments.Count - 1
'     WScript.Echo WScript.Arguments(i)
' Next
' dim strPara1
' strPara1 = WScript.Arguments(0)

Dim objWshShell
Set objWshShell = WScript.CreateObject("WScript.Shell")

' objWshShell.Run "C:\Windows\System32\notepad.exe " & strPara1
objWshShell.Run "C:\Windows\System32\notepad.exe "

Set objWshShell = Nothing