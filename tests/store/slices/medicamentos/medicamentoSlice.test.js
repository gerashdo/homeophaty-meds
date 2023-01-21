import { 
    addMedicamento,
    changeLoadingMedicamentos, 
    changeSearchValue, 
    deleteMedicamento, 
    medicamentoSlice, 
    setMedicamentos, 
    updateMedicamento
} from "../../../../src/store/slices/medicamentos/medicamentoSlice";
import { 
    abrotanum30,
    abrotanum30Updated, 
    initialState, 
    oneMedicineState,
    setMedicinesState 
} from "../../../fixtures/meds";


describe('tests for medicamentoSlice', () => {
    
    test('should have the initial state', () => {
        
        expect( medicamentoSlice.getInitialState() ).toEqual( initialState )
    });

    test('should change the isLoadig propery', () => {
        const state = medicamentoSlice.reducer( initialState, changeLoadingMedicamentos() )
        expect( state.isLoading ).toBe( !initialState.isLoading )
    });

    test('should set the loaded medicines', () => {
        const state = medicamentoSlice.reducer( initialState, setMedicamentos({
            page: setMedicinesState.page,
            medicamentos: setMedicinesState.medicamentos
        }))

        expect( state ).toEqual( setMedicinesState )
    });

    test('should add a medicine in the medicines list', () => {
        expect( initialState.medicamentos ).toHaveLength( 0 )

        const state = medicamentoSlice.reducer( 
            initialState, 
            addMedicamento({ medicamento: abrotanum30 })
        )

        expect( state.medicamentos ).toHaveLength( 1 )
        expect( state.medicamentos[0] ).toEqual( abrotanum30 )
    });

    test('should update/replace a medicine with the same id', () => {
        const state = medicamentoSlice.reducer( oneMedicineState, updateMedicamento( abrotanum30Updated ))

        expect( state.medicamentos ).toHaveLength( 1 )
        expect( state.medicamentos[0] ).toEqual( abrotanum30Updated )
    });

    test('should delete a medicine from the medicines list', () => {
        const state = medicamentoSlice.reducer( oneMedicineState, deleteMedicamento({ id: abrotanum30.id }))

        expect( state ).toEqual( initialState )
    });

    test('should change the search value', () => {
        const searchValue = 'Ignatia'

        const state = medicamentoSlice.reducer( initialState, changeSearchValue( searchValue ))

        expect( state.searchValue ).toBe( searchValue )
    });
});