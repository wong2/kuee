#! /usr/bin/env node

require("babel-polyfill")

import Promise from 'bluebird'
import chalk from 'chalk'
import zip from 'lodash.zip'
import { createQueue } from 'kue'
import { argv } from 'yargs'

const JOB_STATES = ['active', 'inactive', 'failed', 'complete', 'delayed']

const prefix = argv.p || 'q'
const redis = argv.r || 'redis://localhost:6379'

const queue = Promise.promisifyAll(createQueue({prefix, redis}))


function render(type, counts) {
  console.log(`${chalk.underline(type)}\n`)
  for (let [state, count] of zip(JOB_STATES, counts)) {
    console.log(`${chalk.green(state)}: ${count}`)
  }
  console.log('')
}

async function main() {
  let types = await queue.typesAsync()
  for (let type of types) {
    let counts = await Promise.all(JOB_STATES.map(state => {
      return queue.cardByTypeAsync(type, state)
    }))
    render(type, counts)
  }
}

main().then(() => {
  process.exit()
}).catch(console.error)
