'use strict'

const path = require('path')
const context = path.dirname(module.parent.filename)

// only for relative path uri
module.exports = function (uri) {
  const filename = path.resolve(context, uri)
  const modluePath = require.resolve(filename)
  const cachedModule = getCachedModule(modluePath)

  if (cachedModule) {
    cleanModulesCache(cachedModule)
  }

  return require(filename)
}

// clean self cache for dynamic module.parent
cleanModulesCache(module)

function getCachedModule (filename) {
  return require.cache[filename]
}

// clean caches recursively
function cleanModulesCache (modules) {
  modules = [].concat(modules)
  modules.forEach(function (module) {
    delete require.cache[module.filename]
    if (module.children.length) {
      cleanModulesCache(module.children)
    }
  })
}
