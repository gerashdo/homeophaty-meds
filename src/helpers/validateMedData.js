import { medicineTypes } from "./medicineTypes";

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









