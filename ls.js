require('./helper')
let fs = require('fs').promise
let path = require('path')
let {dir} = require('yargs')
    .default('dir', __dirname)
    .argv

let logStream = process.stdout

async function ls() {
  // Use 'await' inside 'async function's
  console.log('Executing ls function...')

  let promise = fs.readdir(dir)
  let fileNames = await promise
  for (let fileName of fileNames) {
    //console.log(fileName);
    //logStream.write('\n fileName : ' + fileName)
    let filePath = path.join(dir, fileName)
    //logStream.write('\n filePath : ' + filePath)
    let statPromise = fs.stat(filePath)
    let stat = await statPromise
    if (!stat.isDirectory()) {
      logStream.write('\n fileName : ' + fileName)
      logStream.write('\n filePath : ' + filePath)
      logStream.write('\n isDir : ' + stat.isDirectory())
    }
  }
  // Your implementation here
}

ls()
