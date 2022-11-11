
export const medDescriptionForCard = ( initString = '' ) => {
    if( initString ){
        if( initString.length > 150 ){
            return `${initString.substring(0, 150)}...`
        }else{
            return initString
        }
    }
}