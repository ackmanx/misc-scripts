### To change all files recursively to varr:staff ownership
chown -R varr:staff * .[^.]*

### To find all files belonging to the group admin
find . -group admin

### Find processes listening on port 3666, output only the PID and then pass that to kill using `xargs` command
lsof -ti tcp:3666 -sTCP:LISTEN | xargs kill

### Helpful functions
grephere() {
    grep -rIi --exclude=\*.{bgr,rgb,rgba} --color "$1" .
}

gitpop() {
    echo 'Are you sure you want to soft reset the previous commit? (y/n)'
    echo 'Make sure this has not been pushed to origin!!!'
    echo `git log --oneline -1`

    read answer

    if [ $answer = 'y' ]; then
        git reset --soft HEAD^
    fi
}
