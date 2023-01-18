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

    const alertSuccessContent = {
        alertMessage: expect.any( String ),
        alertType: 'success'
    }

    const alertErrorContent = {
        alertMessage: expect.any( String ),
        alertType: 'error'
    }

    const alertCatchErrorContent = {
        alertMessage: 'Error interno, contacte al administrador',
        alertType: 'error'
    }

    beforeEach( () => {
        jest.clearAllMocks()
    })

    afterEach( () => {
        jest.restoreAllMocks()
    })

    describe('Tests for startLoadingMedicamentos', () => {
        
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
            expect( startAlertMock ).toHaveBeenCalledWith( alertErrorContent )
        });

        test('should start an error alert if the status code of the request fails', async() => {
            const mockStore = getMockStore( initialState )
            jest.spyOn( global, 'fetch')
                .mockImplementationOnce( () => Promise.resolve({
                    status: 400,
                    json: () => Promise.reject({ msg: 'error ocurred' })
                }))
            const startAlertMock = jest.spyOn( uiState, 'startAlert')
            
            const { result } = renderHook( () => useMedsStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
            })
    
            await act( async() => {
                await result.current.startLoadingMedicamentos()
            })
    
            expect( result.current.isLoading ).toBeFalsy()
            expect( startAlertMock ).toHaveBeenCalledWith( alertCatchErrorContent )
        });
    });

    describe('Tests for startAddNewMedicamento', () => {
        
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
            expect( startAlertMock ).toHaveBeenCalledWith( alertSuccessContent )
        });
    
        test('should start and error alert if the status code is different to 201', async() => {
            const mockStore = getMockStore( initialState )
            jest.spyOn( global, 'fetch')
                .mockImplementationOnce( () => Promise.resolve({
                    status: 400,
                    json: () => Promise.resolve({ msg: 'Error occurred' })
                }))
            const startAlertMock = jest.spyOn( uiState, 'startAlert')
    
            const { result } = renderHook( () => useMedsStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
            })
    
            await act( async() => {
                await result.current.startAddNewMedicamento( abrotanum30 )
            })
    
            expect( result.current.medicamentos ).toHaveLength( 0 )
            expect( startAlertMock ).toHaveBeenCalledWith( alertErrorContent )
        });

        test('should start and error alert if the request fails', async() => {
            const mockStore = getMockStore( initialState )
            jest.spyOn( global, 'fetch')
                .mockImplementationOnce( () => Promise.resolve({
                    status: 400,
                    json: () => Promise.reject({ msg: 'Error occurred' })
                }))
            const startAlertMock = jest.spyOn( uiState, 'startAlert')
    
            const { result } = renderHook( () => useMedsStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
            })
    
            await act( async() => {
                await result.current.startAddNewMedicamento( abrotanum30 )
            })
    
            expect( result.current.medicamentos ).toHaveLength( 0 )
            expect( startAlertMock ).toHaveBeenCalledWith( alertCatchErrorContent )
        });
    });

    describe('Tests for startUpdateMedicamento', () => {

        test('should call the upadateMedicamento from medicamentoSlice if the request is correct', async() => {
            const mockStore = getMockStore( initialState )
            const medModified = { ...abrotanum30, description: 'modified'}

            jest.spyOn( global, 'fetch')
                .mockImplementationOnce( () => Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve({ medicine: medModified })
                }))
    
            const updateMedicamentoMock = jest.spyOn( medicamentoState, 'updateMedicamento')
            const startAlertMock = jest.spyOn( uiState, 'startAlert')
    
            const { result } = renderHook( () => useMedsStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
            })
    
            await act( async() => {
                await result.current.startUpdateMedicamento( abrotanum30.id, medModified )
            })
            
            expect( updateMedicamentoMock ).toHaveBeenCalledWith( medModified )
            expect( startAlertMock ).toHaveBeenCalledWith( alertSuccessContent )
        });

        test('should dispatch an error alert if the response status code is different to 200', async() => {
            const mockStore = getMockStore( initialState )
            
            jest.spyOn( global, 'fetch' )
                .mockImplementationOnce( () => Promise.resolve({
                    status: 400,
                    json: () => Promise.resolve({ msg: 'Error Ocurred' })
                }))
            const startAlertMock = jest.spyOn( uiState, 'startAlert' )

            const { result } = renderHook( () => useMedsStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
            })

            await act( async() => {
                await result.current.startUpdateMedicamento( abrotanum30, { ...abrotanum30, description: 'modified' } )
            })

            expect( startAlertMock ).toHaveBeenCalledWith( alertErrorContent )
        });

        test('should dispatch an error alert if the request fails', async() => {
            const mockStore = getMockStore( initialState )
            
            jest.spyOn( global, 'fetch' )
                .mockImplementationOnce( () => Promise.resolve({
                    status: 500,
                    json: () => Promise.reject({ msg: 'Error Ocurred' })
                }))
            const startAlertMock = jest.spyOn( uiState, 'startAlert' )

            const { result } = renderHook( () => useMedsStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
            })

            await act( async() => {
                await result.current.startUpdateMedicamento( abrotanum30, { ...abrotanum30, description: 'modified' } )
            })

            expect( startAlertMock ).toHaveBeenCalledWith( alertCatchErrorContent )
        });
    });

    describe('Tests for startDeleteMedicamento', () => {
        test('should call deleteMedicamento from medicamentoSlice if the request is succesfull', async() => {
            const mockStore = getMockStore( initialState )

            jest.spyOn( global, 'fetch' )
                .mockImplementationOnce( () => Promise.resolve({
                    status: 202,
                    json: () => Promise.resolve({ medicine: abrotanum30 })
                }))
            const deleteMedicamentoMock = jest.spyOn( medicamentoState, 'deleteMedicamento' )
            const startAlertMock = jest.spyOn( uiState, 'startAlert' )

            const { result } = renderHook( () => useMedsStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
            })

            await act( async() => {
                await result.current.startDeleteMedicamento( abrotanum30.id )
            })

            expect( deleteMedicamentoMock ).toHaveBeenCalledWith({ id: abrotanum30.id })
            expect( startAlertMock ).toHaveBeenCalledWith( alertSuccessContent )
        });

        test('should dispatch an error alert if the request status code is different to 202', async() => {
            const mockStore = getMockStore( initialState )

            jest.spyOn( global, 'fetch' )
                .mockImplementationOnce( () => Promise.resolve({
                    status: 400,
                    json: () => Promise.resolve({ msg: 'error ocurred' })
                }))
            const startAlertMock = jest.spyOn( uiState, 'startAlert' )

            const { result } = renderHook( () => useMedsStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
            })

            await act( async() => {
                await result.current.startDeleteMedicamento( abrotanum30.id )
            })

            expect( startAlertMock ).toHaveBeenCalledWith( alertErrorContent )
        });

        test('should dispatch an error alert if the request status code is different to 202', async() => {
            const mockStore = getMockStore( initialState )
            const msg = 'error ocurred'
            jest.spyOn( global, 'fetch' )
                .mockImplementationOnce( () => Promise.resolve({
                    status: 400,
                    json: () => Promise.resolve({ msg })
                }))
            const startAlertMock = jest.spyOn( uiState, 'startAlert' )

            const { result } = renderHook( () => useMedsStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
            })

            await act( async() => {
                await result.current.startDeleteMedicamento( abrotanum30.id )
            })

            expect( startAlertMock ).toHaveBeenCalledWith({ ...alertErrorContent, alertMessage: msg })
        });

        test('should dispatch an error alert if the request status code is different to 202', async() => {
            const mockStore = getMockStore( initialState )
            const msg = 'error ocurred'
            jest.spyOn( global, 'fetch' )
                .mockImplementationOnce( () => Promise.resolve({
                    status: 400,
                    json: () => Promise.reject({ msg })
                }))
            const startAlertMock = jest.spyOn( uiState, 'startAlert' )

            const { result } = renderHook( () => useMedsStore(), {
                wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
            })

            await act( async() => {
                await result.current.startDeleteMedicamento( abrotanum30.id )
            })

            expect( startAlertMock ).toHaveBeenCalledWith( alertCatchErrorContent )
        });
    });
    
});