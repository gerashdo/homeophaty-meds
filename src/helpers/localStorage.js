

export const saveUserAndToken = ( token = '', user = {} ) => {
    if( token ){
        localStorage.setItem( "token", token )
        localStorage.setItem( "token-date", new Date().getTime() )
        
    }

    if( Object.keys( user ).length > 0 ){
        localStorage.setItem( "user", JSON.stringify( user ))
    }

}

export const deleteUserAndToken = () => {
    localStorage.removeItem( "token" )
    localStorage.removeItem( "user" )
    localStorage.removeItem( "token-date" )
}