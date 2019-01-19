@echo off
cd react
start /wait cmd /C npm run prod
cd ..
WebPublisher.exe wpconfig.json
