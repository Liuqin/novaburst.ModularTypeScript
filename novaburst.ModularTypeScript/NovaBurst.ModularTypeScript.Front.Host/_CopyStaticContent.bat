REM set currentDir=%cd%

REM cd "..\..\..\NovaBurst.ModularTypeScript.Core.UI\modules\Core"
REM call "_module.bat"

REM cd "..\..\..\NovaBurst.ModularTypeScript.Person.UI\modules\Person"
REM call "_module.bat"

REM cd "..\..\..\NovaBurst.ModularTypeScript.Sales.UI\modules\Sales"
REM call "_module.bat"

REM cd "..\..\..\NovaBurst.ModularTypeScript.Front.UI\modules\Front"
REM call "_module.bat"

REM pushd %currentDir%

rd /S /Q "website"

robocopy "..\..\..\NovaBurst.ModularTypeScript.Core.UI\modules" "website\modules" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.Core.UI\scripts" "website\scripts" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.Core.UI\views" "website\views" /E /njh /njs /ndl /nc /ns /nfl

robocopy "..\..\..\NovaBurst.ModularTypeScript.Person.UI\modules" "website\modules" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.Person.UI\scripts" "website\scripts" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.Person.UI\views" "website\views" /E /njh /njs /ndl /nc /ns /nfl

robocopy "..\..\..\NovaBurst.ModularTypeScript.Sales.UI\modules" "website\modules" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.Sales.UI\scripts" "website\scripts" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.Sales.UI\views" "website\views" /E /njh /njs /ndl /nc /ns /nfl

robocopy "..\..\..\NovaBurst.ModularTypeScript.Front.UI\modules" "website\modules" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.Front.UI\scripts" "website\scripts" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.Front.UI\views" "website\views" /E /njh /njs /ndl /nc /ns /nfl