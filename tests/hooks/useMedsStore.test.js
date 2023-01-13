import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useMedsStore } from "../../src/hooks/useMedsStore";
import { authSlice } from "../../src/store/slices/auth/authSlice";
import { medicamentoSlice } from "../../src/store/slices/medicamentos/medicamentoSlice";
import * as medicamentoState from "../../src/store/slices/medicamentos/medicamentoSlice";
import * as uiState from "../../src/store/slices/ui/uiSlice";
import { uiSlice } from "../../src/store/slices/ui/uiSlice";
import { initialState, medsListFixture, abrotanum30 } from "../fixtures/meds";

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            medicamento: medicamentoSlice.reducer,
            auth: authSlice.reducer,
            ui: uiSlice.reducer,
        },
        preloadedState: {
            medicamento: { ...initialState }
        }
    })
}

describe('Tests for useMedsStore', () => {

    beforeEach( () => {
        jest.clearAllMocks()
    })

    afterEach( () => {
        jest.restoreAllMocks()
    })
    
    test('should return the default values', () => {
        
        const mockStore = getMockStore( initialState )

        const { result } = renderHook( () => useMedsStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        })

        expect( result.current ).toEqual({
            ...initialState,
            startLoadingMedicamentos: expect.any( Function ),
            startAddNewMedicamento: expect.any( Function ),
            startUpdateMedicamento: expect.any( Function ),
            startDeleteMedicamento: expect.any( Function ),
        })
    });

    test('should load the medicines correctly', async() => {
        const mockStore = getMockStore( initialState )
        jest.spyOn( global, 'fetch')
            .mockImplementationOnce( () => Promise.resolve({
                status: 200,
                json: () => Promise.resolve({ medicines: medsListFixture })
            }))
        
        const setMedicamentosMock = jest.spyOn( medicamentoState, 'setMedicamentos' )
        const changeLoadingMedicamentosMock = jest.spyOn( medicamentoState, 'changeLoadingMedicamentos' )

        const { result } = renderHook( () => useMedsStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        })

        await act( async() => {
            await result.current.startLoadingMedicamentos()
        })

        const { medicamentos } = result.current
        expect( medicamentos ).toEqual( medsListFixture )
        expect( setMedicamentosMock ).toHaveBeenCalled()
        expect( changeLoadingMedicamentosMock ).toHaveBeenCalled()
    });

    test('should start an error alert if the status code of the request is not 200 when loading medicines', async() => {
        const mockStore = getMockStore( initialState )
        jest.spyOn( global, 'fetch')
            .mockImplementationOnce( () => Promise.resolve({
                status: 400,
                json: () => Promise.resolve({ msg: 'error ocurred' })
            }))
        const startAlertMock = jest.spyOn( uiState, 'startAlert')
        
        const { result } = renderHook( () => useMedsStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        })

        await act( async() => {
            await result.current.startLoadingMedicamentos()
        })

        expect( result.current.isLoading ).toBeFalsy()
        expect( startAlertMock ).toHaveBeenCalledWith({
            alertMessage: expect.any( String ),
            alertType: 'error'
        })
    });

    test('should add a new medicine correctly', async() => {
        const mockStore = getMockStore( initialState )
        jest.spyOn( global, 'fetch')
            .mockImplementationOnce( () => Promise.resolve({
                status: 201,
                json: () => Promise.resolve({ medicine: abrotanum30 })
            }))
        const startAlertMock = jest.spyOn( uiState, 'startAlert')
        
        const { result } = renderHook( () => useMedsStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        })

        await act( async() => {
            await result.current.startAddNewMedicamento( abrotanum30 )
        })

        expect( result.current.medicamentos ).toHaveLength( 1 )
        expect( result.current.medicamentos[0] ).toEqual( abrotanum30 )
        expect( startAlertMock ).toHaveBeenCalledWith({
            alertMessage: expect.any( String ),
            alertType: 'success'
        })
    });
    
});