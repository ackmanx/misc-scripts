gitpop() {
    echo 'Are you sure you want to soft reset the previous commit? (y/n)'
    echo 'Make sure this has not been pushed to origin!!!'
    echo `git log --oneline -1`

    read answer

    if [ $answer = 'y' ]; then
        git reset --soft HEAD^
    fi
}
