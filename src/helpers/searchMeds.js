
// Eliminar los espacios de un [] de strings para crear una sola
// con todos los valores del arreglo
const deleteStringWhiteSpaces = ( strings ) => {
    let completeString = ""
    
    strings.map( str => {
        completeString += str.split(" ").join('')
    })

    return completeString
}

export const searchStringInMed = ( string, medsList ) => {
    return medsList
        .filter( val => (
            deleteStringWhiteSpaces([ val.name, val.ch ])
                .toLowerCase().includes( deleteStringWhiteSpaces([ string ]).toLowerCase() )
        ))
}