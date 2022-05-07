#!/bin/bash

read -p 'Yarigatake is the second highest in japan, right? [y/n]' ans
if [ $ans = "n" ]; then
	echo That\'s right!
else
	echo No... that\'s Kitadake!
fi