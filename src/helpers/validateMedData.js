
function isNumeric( value ) {
    return /^\d+$/.test( value );
}

export const formatMedData = ( medicamento ) => {
    if( !isNumeric( medicamento.ch )){
        medicamento.ch = ''
    }

    return medicamento
}









