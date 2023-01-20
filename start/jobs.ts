import { resolve } from 'path'
import { loadContext } from 'app/infra/utils'

const jobs: string[] = []

const loadInitJobs = loadContext(resolve(__dirname, '../app/modules'), true, /infra\/jobs\/*.ts$/)

for (const jobModule of loadInitJobs.keys()) {
  jobs.push(...loadInitJobs(jobModule))
}

export default jobs
