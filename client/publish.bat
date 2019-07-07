@echo off
start /wait cmd /C npm run prod
WebPublisher.exe wpconfig.json
