import { deleteStringWhiteSpaces, searchStringInMed } from "../../src/helpers/searchMeds";
import { abrotanum30, calendula200, calendula30 } from "../fixtures/meds";


describe('tests for searchMeds helper', () => {
    
    
    test('should return a string with no blank spaces from the values of an array', () => {
        const strings = [ ' i do', ' not ', 'want to have', 'spaces ' ]

        const result = deleteStringWhiteSpaces( strings )
        
        expect( result ).toEqual( 'idonotwanttohavespaces' )
    });

    test('should return a list with the meds that contains the string', () => {
        const medsArray = [ calendula200, calendula30, abrotanum30 ]

        const result = searchStringInMed( 'cal', medsArray )

        expect( result.length ).toBe( 2 )
        
    });
});