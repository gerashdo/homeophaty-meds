import { act, renderHook } from "@testing-library/react";
import { usePaginate } from "../../src/hooks/usePaginate";


describe('tests for usePaginate hook', () => {
    const totalPages = 6
    
    test('should create just four pages values', () => {
        const actualPage = 1
        const { result } = renderHook( () => (
            usePaginate( totalPages, actualPage )
        ))

        const { setCurrentPage, pages, currentPage } = result.current
        expect( setCurrentPage ).toEqual( expect.any( Function ))
        expect( currentPage ).toBe( actualPage )
        expect( pages.length ).toBe( 4 )
    });

    test('should create two pages before current page, the current one and one after', () => {
        const actualPage = 4
        const { result } = renderHook( () => (
            usePaginate( totalPages, actualPage )
        ))

        const { pages } = result.current
        expect( pages ).toEqual( [ 2, 3, 4, 5 ])
    });

    test('should render the last 4 pages if the current is the last one', () => {
        const actualPage = 6
        const { result } = renderHook( () => (
            usePaginate( totalPages, actualPage )
        ))

        const { pages } = result.current
        expect( pages ).toEqual( [ 3, 4, 5, 6 ])
    });

    test('should render the first 4 pages if the current is the first, second or third page', () => {
        const actualPage = 1
        const { result } = renderHook( () => (
            usePaginate( totalPages, actualPage )
        ))
        const { setCurrentPage } = result.current
        expect( result.current.pages ).toEqual([ 1,2,3,4 ])

        act( () => setCurrentPage( 2 ) )
        expect( result.current.pages ).toEqual([ 1,2,3,4  ])

        act( () => setCurrentPage( 3 ) )
        expect( result.current.pages ).toEqual([ 1,2,3,4  ])
    });

    test('should render all pages if the totalPages number is 4 or less', () => {
        const actualPage = 1
        const { result } = renderHook( () => (
            usePaginate( 3, actualPage )
        ))
        
        expect( result.current.pages ).toEqual([ 1,2,3 ])
    });

    test('should change the current page if the setCurrentPage is fired', () => {
        const actualPage = 1
        const { result } = renderHook( () => (
            usePaginate( totalPages, actualPage )
        ))
        expect( result.current.currentPage ).toBe( actualPage )

        let newPage = 2
        act( () => result.current.setCurrentPage( newPage ) )
        expect( result.current.currentPage ).toBe( newPage )

        newPage = 5
        act( () => result.current.setCurrentPage( newPage ) )
        expect( result.current.currentPage ).toBe( newPage )
    });
});