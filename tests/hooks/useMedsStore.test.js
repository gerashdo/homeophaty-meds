import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useMedsStore } from "../../src/hooks/useMedsStore";
import { authSlice } from "../../src/store/slices/auth/authSlice";
import { medicamentoSlice } from "../../src/store/slices/medicamentos/medicamentoSlice";
import * as medicamentoState from "../../src/store/slices/medicamentos/medicamentoSlice";
import { uiSlice } from "../../src/store/slices/ui/uiSlice";
import { initialState, medsListFixture } from "../fixtures/meds";


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

    

});