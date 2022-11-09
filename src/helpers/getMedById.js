
export const getMedById = ( id, medicines ) => {
    return medicines.find( med => med.id === id || med._id === id )
}