

const calculateHoursPassed = ( time1, time2 ) => {
    return ( time2 - time1 ) / 1000 / 60 /60 
}

export const timeToRenovateToken = ( tokenDate = 0 ) => {
    if( tokenDate == 0 ){
        return true
    }

    const hoursDiff = calculateHoursPassed(
        tokenDate,
        new Date().getTime()
    )

    return hoursDiff >= 7 ? true : false
}