If desired to copy all static content using post build event without the _CopyStaticContent.bat then copy paste the following lines in Post Build Event input:


rd /S /Q "$(TargetDir)website"

robocopy "$(TargetDir)..\..\..\NovaBurst.ModularTypeScript.Core.UI\modules" "$(TargetDir)website\modules" /E
robocopy "$(TargetDir)..\..\..\NovaBurst.ModularTypeScript.Core.UI\scripts" "$(TargetDir)website\scripts" /E
robocopy "$(TargetDir)..\..\..\NovaBurst.ModularTypeScript.Core.UI\views" "$(TargetDir)website\views" /E

robocopy "$(TargetDir)..\..\..\NovaBurst.ModularTypeScript.Person.UI\modules" "$(TargetDir)website\modules" /E
robocopy "$(TargetDir)..\..\..\NovaBurst.ModularTypeScript.Person.UI\scripts" "$(TargetDir)website\scripts" /E
robocopy "$(TargetDir)..\..\..\NovaBurst.ModularTypeScript.Person.UI\views" "$(TargetDir)website\views" /E

robocopy "$(TargetDir)..\..\..\NovaBurst.ModularTypeScript.Sales.UI\modules" "$(TargetDir)website\modules" /E
robocopy "$(TargetDir)..\..\..\NovaBurst.ModularTypeScript.Sales.UI\scripts" "$(TargetDir)website\scripts" /E
robocopy "$(TargetDir)..\..\..\NovaBurst.ModularTypeScript.Sales.UI\views" "$(TargetDir)website\views" /E

robocopy "$(TargetDir)..\..\..\NovaBurst.ModularTypeScript.Front.UI\modules" "$(TargetDir)website\modules" /E
robocopy "$(TargetDir)..\..\..\NovaBurst.ModularTypeScript.Front.UI\scripts" "$(TargetDir)website\scripts" /E
robocopy "$(TargetDir)..\..\..\NovaBurst.ModularTypeScript.Front.UI\views" "$(TargetDir)website\views" /E

exit 0