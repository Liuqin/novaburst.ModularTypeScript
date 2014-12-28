REM set currentDir=%cd%

REM cd "..\..\..\NovaBurst.ModularTypeScript.Core.UI\modules\Core"
REM call "_module.bat"

REM cd "..\..\..\NovaBurst.ModularTypeScript.AppX.Core.UI\modules\AppX.Core"
REM call "_module.bat"

REM cd "..\..\..\NovaBurst.ModularTypeScript.AppX.Sales.UI\modules\AppX.Sales"
REM call "_module.bat"

REM cd "..\..\..\NovaBurst.ModularTypeScript.AppX.Front.UI\modules\AppX.Front"
REM call "_module.bat"

REM pushd %currentDir%

rd /S /Q "website"

robocopy "..\..\..\NovaBurst.ModularTypeScript.Core.UI\modules" "website\modules" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.Core.UI\scripts" "website\scripts" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.Core.UI\content" "website\content" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.Core.UI\fonts" "website\fonts" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.Core.UI\views" "website\views" /E /njh /njs /ndl /nc /ns /nfl

robocopy "..\..\..\NovaBurst.ModularTypeScript.AppX.Core.UI\modules" "website\modules" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.AppX.Core.UI\scripts" "website\scripts" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.AppX.Core.UI\content" "website\content" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.AppX.Core.UI\fonts" "website\fonts" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.AppX.Core.UI\views" "website\views" /E /njh /njs /ndl /nc /ns /nfl

robocopy "..\..\..\NovaBurst.ModularTypeScript.AppX.Sales.UI\modules" "website\modules" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.AppX.Sales.UI\scripts" "website\scripts" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.AppX.Sales.UI\content" "website\content" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.AppX.Sales.UI\fonts" "website\fonts" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.AppX.Sales.UI\views" "website\views" /E /njh /njs /ndl /nc /ns /nfl

robocopy "..\..\..\NovaBurst.ModularTypeScript.AppX.Front.UI\modules" "website\modules" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.AppX.Front.UI\scripts" "website\scripts" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.AppX.Front.UI\content" "website\content" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.AppX.Front.UI\fonts" "website\fonts" /E /njh /njs /ndl /nc /ns /nfl
robocopy "..\..\..\NovaBurst.ModularTypeScript.AppX.Front.UI\views" "website\views" /E /njh /njs /ndl /nc /ns /nfl