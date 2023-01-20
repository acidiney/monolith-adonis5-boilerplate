import { promisify } from 'util'
import { execFile as childProcessExec } from 'child_process'

const exec = promisify(childProcessExec)

export const execCommand = async (command: string, commandArgs: string[]) => {
  const { stdout, stderr } = await exec(command, commandArgs, {
    env: {
      ...process.env,
      FORCE_COLOR: 'true',
    },
  })

  if (stdout) {
    console.log(stdout.trim())
  }

  if (stderr) {
    console.log(stderr.trim())
    throw new Error(`Command "${command}" failed`)
  }
}
