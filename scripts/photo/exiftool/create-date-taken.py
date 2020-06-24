# Usage:
# Batch updates date metadata to specified stamp below, with seconds being a counter
# Files to update MUST be a .jpg
#
# In the directory with images, execute `python <path-to-script>`
#
# The EXIF date tags will be updated but the filename will not change
# exiftool will create backups of each file updated
#
# WARNING!
# If you have more than 59 photos in the folder, you'll get seconds over 59 for that minute
# This will screw up viewing of the photos and metadata
# Separate into different folders if this is the case

import os
import subprocess
import sys

count = 0

# User Modifiable Variables Here
# Base timestamp is what is actually written. Seconds are omitted here because those are generated with the counter.
# Note this is the correct format for exiftool, (: between days are correct)
BASE_TIMESTAMP = '2012:07:03 14:27:'


def exiftool_exists():
    return subprocess.call("type exiftool", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE) == 0

if not exiftool_exists():
    print 'exiftool executable required!'
    sys.exit(1)


answer = raw_input('Update ALL jpg images in current folder to: ' + BASE_TIMESTAMP + ' (y/n) ')

if not answer == 'y':
    sys.exit(1)

for filename in os.listdir('.'):
    if filename.endswith('.jpg'):
        cmd = 'exiftool -AllDates="{0}{1}" "{2}"'.format(BASE_TIMESTAMP, count, filename)
        print cmd
        subprocess.Popen(cmd, shell=True).wait()
        count += 1
