#RequireAdmin
#include <MsgBoxConstants.au3>
#include <AutoItConstants.au3>
#include "_ImageSearch_UDF.au3"
#include "_ImageSearch_Tool.au3"

;~ #include <ImageSearchEasy.au3>
Global Const $Ask_On_Found = 0
Global Const $Mouse_Move_On_Found = 1
Global Const $Mouse_Click_On_Found = 0

Global Const $iSleep_Time=200
$bmine  = @ScriptDir & "\mine.bmp"
;~ $minetocleam  = @ScriptDir & "\minetocleam.bmp"
$cleamcapcha  = @ScriptDir & "\cleamcapcha.bmp"
$selectbot  = @ScriptDir & "\selectbot.bmp"
$apporve  = @ScriptDir & "\apporve.bmp"
$gohome  = @ScriptDir & "\gohome.bmp"
$minehome  = @ScriptDir & "\minehome.bmp"
$alertgooglecapha  = @ScriptDir & "\alertgooglecapha.bmp"

$alert = "\alert.mp3"
;~ Local $capchawin = WinGetHandle("WAX Cloud Wallet - Google Chrome");
;~ WinMove($handle,"",0,0,1067,648)
HotKeySet("{F2}","_start")
HotKeySet("{F3}","_exit")
Opt( "MouseCoordMode" ,2)

While 1
    Sleep(100)
WEnd

Func _start()
    While 1
        Sleep(1000)
    ;~ Local $handle = WinGetHandle("Alien Worlds - Google Chrome")

    ;~ Local $R_gohome = _ImageSearch($gohome)
    ;~ If $R_gohome[0] = 1 Then
    ;~     MouseMove($R_gohome[1],$R_gohome[2],1)
    ;~     ControlClick($handle, "", "", "left", 1, $R_gohome[1], $R_gohome[2])
    ;~     If $Mouse_Move_On_Found Then
	;~ 		Sleep($iSleep_Time)
	;~ 	EndIf
    ;~ EndIf

    ;~ Sleep(200)

    ;~ Local $R_minehome = _ImageSearch($minehome)
    ;~ If $R_minehome[0] = 1 Then
    ;~     MouseMove($R_minehome[1],$R_minehome[2],1)
    ;~     ControlClick($handle, "", "", "left", 1, $R_minehome[1], $R_minehome[2])
    ;~     If $Mouse_Move_On_Found Then
	;~ 		Sleep($iSleep_Time)
	;~ 	EndIf
    ;~ EndIf
    ;~ Sleep(200)

    ;~ WinMove($handle,"",0,0,1067,648)
    ;~ Local $return = _ImageSearch($bmine)
    ;~ ;~ MouseMove($return[1],$return[2])
    ;~ If $return[0] = 1 Then
    ;~     MouseMove($return[1],$return[2],1)
    ;~     ControlClick($handle, "", "", "left", 1, $return[1], $return[2])
    ;~     If $Mouse_Move_On_Found Then
	;~ 		;~ MouseMove($return[1], $return[2])
	;~ 		Sleep($iSleep_Time)
	;~ 	EndIf
    ;~ EndIf
    ;~ Sleep(200)

    
    ;~ Local $R_cleamcapcha = _ImageSearch($cleamcapcha)
    ;~ If $R_cleamcapcha[0] = 1 Then
    ;~     MouseMove($R_cleamcapcha[1],$R_cleamcapcha[2],1)
    ;~     ControlClick($handle, "", "", "left", 1, $R_cleamcapcha[1], $R_cleamcapcha[2])
    ;~     If $Mouse_Move_On_Found Then
	;~ 		Sleep($iSleep_Time)
	;~ 	EndIf
    ;~ EndIf
    ;~ Sleep(200)

    Local $handlecapcha = WinGetHandle("WAX Cloud Wallet - Google Chrome");
    ;~ WinMove($handlecapcha,"",1923,0,547,786)
    WinMove($handlecapcha,"",0,0,547,786)
    Local $R_selectbot = _ImageSearch($selectbot)
    If $R_selectbot[0] = 1 Then
        SoundPlay(@ScriptDir & $alert, 1)
        ;~ MouseMove($R_selectbot[1],$R_selectbot[2],1)
        ControlClick($handlecapcha, "", "", "left", 1, $R_selectbot[1], $R_selectbot[2])
        If $Mouse_Move_On_Found Then
			Sleep($iSleep_Time)
		EndIf
    EndIf
    Sleep(500)

    Local $R_apporve = _ImageSearch($apporve)
    If $R_apporve[0] = 1 Then
        ;~ MouseMove($R_apporve[1],$R_apporve[2],1)
        ControlClick($handlecapcha, "", "", "left", 1, $R_apporve[1], $R_apporve[2])
        If $Mouse_Move_On_Found Then
			Sleep($iSleep_Time)
		EndIf
    EndIf
    Sleep(200)

    Local $R_alertgooglecapha = _ImageSearch($alertgooglecapha)
    If $R_alertgooglecapha[0] = 1 Then
        SoundPlay(@ScriptDir & $alert, 1)
        SoundPlay(@ScriptDir & $alert, 1)
        SoundPlay(@ScriptDir & $alert, 1)
        SoundPlay(@ScriptDir & $alert, 1)
        ;~ MouseMove($R_apporve[1],$R_apporve[2],1)
        ;~ ControlClick($handlecapcha, "", "", "left", 1, $R_alertgooglecapha[1], $R_alertgooglecapha[2])
        If $Mouse_Move_On_Found Then
			Sleep($iSleep_Time)
		EndIf
    EndIf
    Sleep(200)

    


    WEnd
    ;~ ControlClick($handle, "", "", "left", 1, 550, 268)


    
    ;~ If $search = 1 Then
    
    ;~ EndIf

    ;~ If  $result = 1 Then
    ;~     MouseMove($returnX,$returnY,100)
    ;~ Else
    ;~     ToolTip("error")
    ;~     Sleep(1000)
    ;~ EndIf
    ;~ Local $coordinates = SearchForClick("example.bmp")
    ;~ ConsoleWrite(@CRLF & $coordinates)
    
    sleep(200)
EndFunc

Func _exit()
    Exit
EndFunc