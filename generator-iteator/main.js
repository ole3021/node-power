const axios = require('axios')

const zenURL = 'https://api.github.com/zen'

// Non-generator version
// axios.get(zenURL)
//   .then(res => console.log('>>> Non-generator version: ', res.data))

// Implementation fo generator
const gen = (generator) => {
  console.log('>>GENERATOR>> init <<<')
  console.log('>>GENERATOR>> execute geneator: ', generator)
  const iterator = generator()
  console.log('>>GENERATOR>> build iterator')
  const iteration = iterator.next()
  console.log('>>GENERATOR>> iteration(iterator.next()): ', iteration)

  const iterat = iteration => {
    if (iteration.done) return iteration.value

    const promise = iteration.value
    return promise.then(x => {
      const iteration = iterator.next(x)
      console.log('>>GENERATOR>> iteration(iterator.next()): ', iteration)
      iterat(iteration)
    })
  }
  return iterat(iteration)
}

// Generator version
gen(function *() {
  console.log('>>REQUEST>> start <<<')
  console.log('>>REQUEST>> yield a iteration')
  const res1 = yield axios.get(zenURL)
  console.log('>>REQUEST>> complete a iteration')
  console.log('>>REQUEST>> yield a iteration')
  const res2 = yield axios.get(zenURL)
  console.log('>>REQUEST>> complete a iteration')
  console.log('>>REQUEST>> res: ', res1.data, res2.data)
}).catch(console.log)
