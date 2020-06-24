# Usage:
# Update script with patterns you want to look for to edit the date in the order the images were taken
# Files to update MUST end in a digit and be a .jpg
#
# In the directory with images, execute `python <path-to-script>`
#
# The EXIF date tags will be updated but the filename will not change
# exiftool will create backups of each file updated

import os
import subprocess
import sys


def exiftool_exists():
    return subprocess.call("type exiftool", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE) == 0

if not exiftool_exists():
    print 'exiftool executable required!'
    sys.exit(1)


PREFIXES = [
    'michelle.',
    'minna_'
]

BASE_TIMESTAMP_READABLE = '2008-1-1 00:##:##'
BASE_TIMESTAMP = '2008:1:1 00:'

print 'Update jpg images with the following prefixes to: ' + BASE_TIMESTAMP_READABLE
print PREFIXES
answer = raw_input('(y/n) ')

if not answer == 'y':
    sys.exit()

for index, prefix in enumerate(PREFIXES):
    print index
    for filename in os.listdir('.'):
        if filename.startswith(prefix) and filename.endswith('.jpg'):
            counter = filename.split(prefix)[1].split('.')[0]
            cmd = 'exiftool -AllDates="{0}{1}:{2}" "{3}"'.format(BASE_TIMESTAMP, index, counter, filename)
            print cmd
            subprocess.Popen(cmd, shell=True).wait()
