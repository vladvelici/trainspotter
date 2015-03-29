#!/bin/bash

nodejs server.js > ../log_server & disown
nodejs http.js > ../log_http & disown
nodejs notif.js > ../log_notif & disown
