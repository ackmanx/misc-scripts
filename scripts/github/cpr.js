#!/usr/bin/env node

/*
 * To install:
 * Add to path and make executable
 *
 * To run:
 * `cpr.js`
 */

const querystring = require('querystring')
const {exec} = require('child_process')
const {promisify} = require('util')

const execAsync = promisify(exec)

const pullRequestBody = `
**Description**

(Please provide a quick overview of this PR)

**JIRA Link**

[Link Text](https://jira.target.com/browse/SLIN-)

Please ensure that the following are complete before submitting this PR:

* [ ] Unit tests of code changes you've made
* [ ] Cypress tests written for features introduced
* [ ] Cypress snapshots have been generated and committed to git
* [ ] Test Steps in JIRA ticket
`

async function main() {

    try {
        await execAsync('git rev-parse --is-inside-work-tree')
    }
    catch (e) {
        console.log('You are not in a git repository')
        return
    }

    exec('git symbolic-ref --short HEAD', (err, stdout) => {
        const baseUrl = 'https://git.target.com/GEM/slingshot/compare/master...'
        const branchName = stdout.trim()

        if (branchName === 'master') {
            console.log(`You are on master. Check out a branch if you want to create a PR.\n`)

            exec('git --no-pager branch', (err, stdout) => {
                console.log('Here are the branches you currently have checked out:')
                console.log(stdout)
            })

            return
        }

        const queryValues = {
            quick_pull: 1,
            title: `${branchName.split('/')[0]}: Did_Something`,
            body: pullRequestBody,
            labels: `ephemeral`,
        }

        const pullRequestURL = `${baseUrl}${branchName}?${querystring.encode(queryValues)}`

        exec(`open "${pullRequestURL}"`)
    })
}

main()
