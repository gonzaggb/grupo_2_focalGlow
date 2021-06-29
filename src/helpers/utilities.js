function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function randomArray(arrayLength, max) {
  const randomArray = [getRandomInt(0, max)] //defino un array random
  while (randomArray.length < arrayLength) {
    const randomNumber = getRandomInt(0, max) // defino el numero random a evaluar
    if (!randomArray.includes(randomNumber)) {
      // si el random no se incluye en el randomArray
      randomArray.push(randomNumber) // lo guardo
    }
  }

  return randomArray
}

function randomArray2(arrayLength, max) {
  const randomArray = []
  //Creo un array de numeros random que no se repitan
  while (randomArray.length < Math.min(max, arrayLength)) {
    let randomNumber = getRandomInt(0, arrayLength)
    !randomArray.includes(randomNumber) ? randomArray.push(randomNumber) : ''
  }

  return randomArray
}

module.exports = {
  randomArray,
  randomArray2,
}
