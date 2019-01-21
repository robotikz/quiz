'*********************************************************
'Full-Hoas, the code should be formatted for better look
'*********************************************************
Set objArgs = WScript.Arguments 
Dim t 
t = Now
Dim Input

Set fso = CreateObject("Scripting.FileSystemObject")

InputFolderJob = "c:\Users\Public\xampp\htdocs\"
InputFolderHome = "c:\xampp\htdocs\"

REM Input = "1"'InputBox("PICK A NUMBER for the path (1-c:\Users\Public\xampp, 2-c:\xampp)","zip","1") 
REM if Input="1" then 
	REM InputFolder = "c:\Users\Public\xampp\htdocs\" 
REM elseif Input="2" then 
	REM InputFolder = "c:\xampp\htdocs\" 
REM Else
	REM Wscript.Quit
REM end if
If (fso.FolderExists(InputFolderJob)) Then
	InputFolder = InputFolderJob
ElseIf (fso.FolderExists(InputFolderHome)) Then
	InputFolder = InputFolderHome
Else
	MsgBox "No Job-Folder and No Home-Folder"
	Wscript.Quit
End If 

'*********************************************
'START MESSAGE for USER
Set objExplorer = CreateObject("InternetExplorer.Application")
objExplorer.Navigate "about:blank"
objExplorer.ToolBar = 0
objExplorer.StatusBar = 0
objExplorer.Left = 400
objExplorer.Top = 200
objExplorer.Width = 400
objExplorer.Height = 200
objExplorer.Visible = 1             
objExplorer.Document.Body.Style.Cursor = "wait"
objExplorer.Document.Title = "New Version"
objExplorer.Document.Body.InnerHTML = "Cache deletion in process: " & InputFolder & " -> "
'*********************************************


Set wss = CreateObject("WScript.Shell")
'remove cache
If (fso.FolderExists(InputFolder & "quiz\var\cache\")) Then
	Set folder = fso.GetFolder(InputFolder & "quiz\var\cache\" )
	' delete all files in  folder
	for each f in folder.Files
	   On Error Resume Next
	   name = f.name
	   f.Delete True
	   If Err Then
		 WScript.Echo "Error deleting:" & Name & " - " & Err.Description
	   Else
		 'wss.Popup Name & " file Deleted", 1, "Progress" ' show message box for a second and close
		 'WScript.Echo "Deleted:" & Name
	   End If
	   On Error GoTo 0
	Next
	' delete all subfolders and files
	For Each f In folder.SubFolders
	   On Error Resume Next
	   name = f.name
	   f.Delete True
	   If Err Then
		 WScript.Echo "Error deleting:" & Name & " - " & Err.Description
	   Else
		 'wss.Popup Name & " folder Deleted", 1, "Progress" ' show message box for a second and close
		 'WScript.Echo "Deleted:" & Name
	   End If
	   On Error GoTo 0
	Next
End If

'remove logs
If (fso.FolderExists(InputFolder & "quiz\var\logs\")) Then
	Set folder = fso.GetFolder(InputFolder & "quiz\var\logs\" )
	' delete all files in  folder
	for each f in folder.Files
	   On Error Resume Next
	   name = f.name
	   f.Delete True
	   If Err Then
		 WScript.Echo "Error deleting:" & Name & " - " & Err.Description
	   Else
		 'wss.Popup Name & " file Deleted", 1, "Progress" ' show message box for a second and close
		 'WScript.Echo "Deleted:" & Name
	   End If
	   On Error GoTo 0
	Next
End If


'remove sessions
If (fso.FolderExists(InputFolder & "quiz\var\sessions\")) Then
	Set folder = fso.GetFolder(InputFolder & "quiz\var\sessions\" )
	' delete all files in  folder
	for each f in folder.Files
	   On Error Resume Next
	   name = f.name
	   f.Delete True
	   If Err Then
		 WScript.Echo "Error deleting:" & Name & " - " & Err.Description
	   End If
	   On Error GoTo 0
	Next
	' delete all subfolders and files
	For Each f In folder.SubFolders
	   On Error Resume Next
	   name = f.name
	   f.Delete True
	   If Err Then
		 WScript.Echo "Error deleting:" & Name & " - " & Err.Description
	   End If
	   On Error GoTo 0
	Next
End If

objExplorer.Document.Body.InnerHTML = "Cache is deleted"
objExplorer.Document.Body.Style.Cursor = "default"
Wscript.Sleep 5000
objExplorer.Quit

