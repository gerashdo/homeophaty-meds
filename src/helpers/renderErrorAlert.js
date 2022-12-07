


export const createContentErrorAlert = ( body ) => {
    if( body.msg ){
        return {
            alertMessage: body.msg,
            alertType: 'error'
        }
    }else{
        return {
            alertMessage: Object.values( body.errors )[0].msg,
            alertType: 'error'
        }
    }
}