import { readdirSync, statSync } from 'fs'
import { resolve, join } from 'path'

export const loadContext = (
  base = '.',
  scanSubDirectories = false,
  regularExpression = /\.ts$/
) => {
  const files = {}

  function readDirectory (directory) {
    readdirSync(directory).forEach((file) => {
      const fullPath = resolve(directory, file)

      if (statSync(fullPath).isDirectory()) {
        if (scanSubDirectories) {
          readDirectory(fullPath)
        }

        return
      }

      if (!regularExpression.test(fullPath)) {
        return
      }

      files[fullPath] = true
    })
  }

  readDirectory(resolve(__dirname, base))

  function Module (file) {
    return require(file)
  }

  Module.keys = () => Object.keys(files)

  return Module
}

export const loadDirectories = (base = '.'):string[] => {
  function flatten (lists) {
    return lists.reduce((a, b) => a.concat(b), [])
  }

  function getDirectories (srcpath) {
    return readdirSync(srcpath)
      .map(file => join(srcpath, file))
      .filter(path => statSync(path).isDirectory())
  }

  function getDirectoriesRecursive (srcpath) {
    return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))]
  }

  return getDirectoriesRecursive(base)
}

