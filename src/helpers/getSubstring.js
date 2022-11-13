
export const medDescriptionForCard = ( initString = '' ) => {
    if( initString ){
        if( initString.length > 100 ){
            return `${initString.substring(0, 100)}...`
        }else{
            return initString
        }
    }
}