
import { medicineTypes } from "./medicineTypes";
import { deleteStringWhiteSpaces } from "./searchMeds";

function isNumeric( value ) {
    return /^\d+$/.test( value );
}

export const formatMedData = ( medicamento ) => {
    if( !isNumeric( medicamento.ch )){
        medicamento.ch = ''
    }
    if( medicamento.type === medicineTypes.Formula ){
        medicamento.ch = ''
    }
    if( medicamento.type === medicineTypes.Medicamento ){
        medicamento.medicines = []
    }
    // if( medicamento.type === medicineTypes.Medicamento && medicamento.ch === ''){
    //     medicamento.errors = 'Selecciona un ch para este medicamento'
    // }

    return medicamento
}

export const medExists = ( medicines, medicine ) => {
    return medicines.find( med => 
        deleteStringWhiteSpaces([ med.name, med.ch ])
            .toLocaleLowerCase() === deleteStringWhiteSpaces([ medicine.name, medicine.ch ])
                .toLocaleLowerCase())
}









