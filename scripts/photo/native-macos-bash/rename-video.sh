#!/usr/bin/env bash

# 20171129_215836
# 20130706_132051 driving_with_yao.mp4
rename 's/^(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})(.*)$/$1-$2-$3 $4.$5.$6 $7/' *.mp4

# 2013-01-31_111658 yao_plays_with_kiana.mp4
rename 's/^(\d{4})-(\d{2})-(\d{2})_(\d{2})(\d{2})(\d{2})(.+)$/$1-$2-$3 $4.$5.$6 $7/' *.mp4

# VID_20130331_160659 getting-keurig-as-gift.mp4
rename 's/^VID_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})(.+)$/$1-$2-$3 $4.$5.$6 $7/' *.mp4

# VID-20140307-Minna likes yao chair more.mp4
rename 's/^VID-(\d{4})(\d{2})(\d{2})(.+)$/$1-$2-$3 00.00.00 $4/' *.mp4

# Convert double spaces to single spaces but keep everything else the same
# video-2012-08-11 21.02.59  xmas-tree-burning-with-dad.mp4
rename 's/  / /g' *

# video-2014-06-13 06.43.30 Mimi and Tofu play in hallway.mp4
rename 's/([a-z-A-Z]) ([a-zA-Z])/$1-$2/g' *

# Lowercase filename (-f needed because macOS is case-insensitive)
# video-2014-06-13 06.43.30 Mimi and Tofu play in hallway.mp4
rename -f -c *
