import os
from subprocess import Popen
Popen("php -S localhost:9000", shell = True)
os.chdir("react")
Popen("npm run dev", shell = True)
