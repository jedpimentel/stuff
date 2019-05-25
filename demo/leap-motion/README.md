# LEAP MOTION INTERFACE

https://developer-archive.leapmotion.com/javascript

v2 tracking is not as good as "Orion" tracking (v3?)

I'm doing the initial setup on Ubuntu Linux, so I'm going with V2
However, Windows should be better for showing off Demos.

A Windows Kiosk would be more expensive than a Raspberry Pi kiosk, but will handle better.

https://askubuntu.com/questions/1008964/problems-installing-leap-motion-orion/1009297

(Reading database ... 172886 files and directories currently installed.)
Preparing to unpack Leap-2.3.1+31549-x64.deb ...
Unpacking leap (2.3.1+31549) over (2.3.1+31549) ...
Setting up leap (2.3.1+31549) ...
Leap Motion installed under /usr/bin and /usr/sbin
To start the Leap Motion daemon, run:
  sudo leapd
This does not appear to be an Debian or Ubuntu-compatible distro
If you would like Leap Motion to run as a service, it is up to you
to configure systemd or /etc/init.d appropriately.
Open the Leap Motion GUI with:
  LeapControlPanel
See /usr/share/Leap/README.linux for more information.
Processing triggers for ureadahead (0.100.0-20) ...

tldr:
	sudo leapd
	LeapControlPanel --showsettings 

(doing `LeapControlPanel` without the `--showsettings` wasn't working with Ubuntu)

https://philtgun.me/2017/02/04/leap-synthesizer-in-pure-data/	

libappindicator-dev installs a BUNCH of dependancies, installing it only beacause
the LeapControlPanel wasn't showing up in the system tray, same with the other installs
this might only be useful for debugging or something,

sudo apt install libappindicator-dev
sudo apt install cpanminus
sudo cpanm Gtk2::AppIndicator

https://bugs.launchpad.net/ubuntu/+source/shutter/+bug/


## TO DO
- Spider Man style web shooter