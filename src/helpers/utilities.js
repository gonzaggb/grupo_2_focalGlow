function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomArray(arrayLength, max) {
    console.log(`el arrayLength es ${arrayLength}`)
    const randomArray = [getRandomInt(0, max)] //defino un array random
    while (randomArray.length < arrayLength) {
        const randomNumber = getRandomInt(0, max) // defino el numero random a evaluar
        if (!randomArray.includes(randomNumber)) { // si el random no se incluye en el randomArray 
            randomArray.push(randomNumber) // lo guardo
        }
    }

    return randomArray
}
module.exports = {
    randomArray,
}
