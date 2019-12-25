http://robotjs.io/
http://robotjs.io/docs/syntax
https://www.npmjs.com/package/robot-js

RobotJS is a system automation library

20191225: I AM PRETTY ANNOYED RIGHT NOW
	I'm using Windows Subsystem for Linux (Bash-4-Windows), and this lib has env
	issues since the WSL env isn't the windows env, but I wanna do stuff to
	windows stuff... ;_;

browser-tab-copy.js :::: was meant to copy the URLs of a browser window's tabs
	- focus/navigate to browser with tabs to dump
	- focus/navigate to command line, so browser is an alt+tab away
	- run script
Instead I spent the day trying in vain to get RobotJS working on WSL
Need to get back to it on a machine that's not using WSL


RobotJS doesn't seem to play well with Windows Subsystem for Linux,
The NodeJS `process.env` prints out the WSL Env, which is is a headless and
closer to an SSH environment or some sandboxed env than actual Windows.

	ex, kept getting this error:

	Could not open main display
	Segmentation fault (core dumped) 


Possible leads
	https://github.com/Microsoft/WSL/issues/219
	https://docs.microsoft.com/en-us/windows/nodejs/beginners
	https://devblogs.microsoft.com/commandline/share-environment-vars-between-wsl-and-windows/