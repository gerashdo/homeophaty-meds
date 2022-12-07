

export const saveUserAndToken = ( token = '', user = {} ) => {
    if( token ){
        localStorage.setItem( "token", token )
    }

    if( Object.keys( user ).length > 0 ){
        localStorage.setItem( "user", JSON.stringify( user ))
    }

}

export const deleteUserAndToken = () => {
    localStorage.removeItem( "token" )
    localStorage.removeItem( "user" )
}