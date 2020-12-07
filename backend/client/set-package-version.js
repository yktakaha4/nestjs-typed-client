const path = require('path')
const fs = require('fs')
const process = require('process')

const main = (ref) => {
  const packagePath = path.join(process.cwd(), '..', 'package.json')
  const clientPackagePath = path.join(process.cwd(), 'package.json')

  const package = JSON.parse(fs.readFileSync(packagePath).toString())
  const clientPackage = JSON.parse(fs.readFileSync(clientPackagePath).toString())

  const clientPackageVersion = clientPackage.version
  const packageVersion = package.version
  const tag = ref.replace(/^.+\//, '')
  if (clientPackageVersion && packageVersion && tag) {
    const newVersion = `${packageVersion}-${tag}`

    if (clientPackageVersion === newVersion) {
      throw new Error(`version not changed: ${newVersion}`)
    } else {
      console.log(`version changed: ${clientPackage.version} => ${newVersion}`);
    }

    clientPackage.version = newVersion;
    fs.writeFileSync(clientPackagePath, JSON.stringify(clientPackage, null, 2) + '\n')

    console.log('done.')
  } else {
    throw new Error(`invalid: clientPackageVersion=${clientPackageVersion}, packageVersion=${packageVersion}, tag=${tag}`)
  }
}

main(process.argv[2]);
