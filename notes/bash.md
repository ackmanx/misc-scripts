### To change all files recursively to varr:staff ownership
chown -R varr:staff * .[^.]*

### To find all files belonging to the group admin
find . -group admin

### Find processes listening on port 3666, output only the PID and then pass that to kill using `xargs` command
lsof -ti tcp:3666 -sTCP:LISTEN | xargs kill
