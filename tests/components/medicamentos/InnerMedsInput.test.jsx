import { configureStore } from "@reduxjs/toolkit";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import * as uiSlice from "../../../src/store/slices/ui/uiSlice";
import { InnerMedsInput } from "../../../src/components/medicamentos/InnerMedsInput";
import { medicamentoSlice } from "../../../src/store/slices/medicamentos";
import { abrotanum200, abrotanum30, medsListFixture } from "../../fixtures/meds";
import { alertGenericInfo } from "../../fixtures/alertFixtures";

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            medicamento: medicamentoSlice.reducer,
        },
        preloadedState: {
            medicamento: { ...initialState }
        }
    })
}

// TODO: pendiente
describe('Tests for <InnerMedsInput />', () => {

    beforeEach( () => {
        jest.clearAllMocks()
    })

    afterEach( () => {
        jest.restoreAllMocks()
    })
    
    const onChangeInnerMeds = jest.fn()

    test('should render the component', () => {

        const storeMock = getMockStore({ medicamentos: medsListFixture })

        const { container } = render(
            <InnerMedsInput 
                onChangeInnerMeds={ onChangeInnerMeds }
            />,
            { wrapper: ({ children }) => <Provider store={ storeMock }>{ children }</Provider>}
        )

        expect( container ).toMatchSnapshot()
    });

    test('should render or not depending if the input is focused', () => {

        const storeMock = getMockStore({ medicamentos: medsListFixture })

        const { queryAllByRole } = render(
            <InnerMedsInput 
                onChangeInnerMeds={ onChangeInnerMeds }
            />,
            { wrapper: ({ children }) => <Provider store={ storeMock }>{ children }</Provider>}
        )

        act( () => screen.getByRole('textbox').focus() )
        expect( screen.getAllByRole('listitem' ).length ).toBeGreaterThan( 0 )

        act( () => screen.getByRole('textbox').blur() )
        expect( queryAllByRole( 'listitem' ).length ).toBe( 0 )

    });

    test('should call the onChangeInnerMeds function if the medicine is not in the innerMeds', () => {
        const storeMock = getMockStore({ medicamentos: medsListFixture })

        render(
            <InnerMedsInput 
                onChangeInnerMeds={ onChangeInnerMeds }
            />,
            { wrapper: ({ children }) => <Provider store={ storeMock }>{ children }</Provider>}
        )
        
        const input = screen.getByRole('textbox')
        act( () => input.focus() )
        fireEvent.change( input, { target: { value: `${abrotanum30.name}` }})

        act( () => screen.getByRole('button').click() )
        
        expect( onChangeInnerMeds ).toHaveBeenCalledWith( abrotanum30 )
    });

    test('should render an info alert if the medicine is alredy in the innerMeds', () => {
        const storeMock = getMockStore({ medicamentos: medsListFixture })
        const startAlertMock = jest.spyOn( uiSlice, 'startAlert')

        render(
            <InnerMedsInput 
                onChangeInnerMeds={ onChangeInnerMeds }
                innerMeds={ medsListFixture }
            />,
            { wrapper: ({ children }) => <Provider store={ storeMock }>{ children }</Provider>}
        )
        
        const input = screen.getByRole('textbox')
        act( () => input.focus() )
        fireEvent.change( input, { target: { value: `${abrotanum30.name}` }})

        act( () => screen.getByRole('button').click() )

        expect( onChangeInnerMeds ).not.toHaveBeenCalled()
        expect( startAlertMock ).toHaveBeenCalledWith({ 
            ...alertGenericInfo, 
            alertMessage: 'El medicamento ya se encuentra en la lista'
        })
    });

    test('should render an info alert if there are more than one result from the input text', () => {
        const storeMock = getMockStore({ medicamentos: [ ...medsListFixture, abrotanum200 ] })
        const startAlertMock = jest.spyOn( uiSlice, 'startAlert')

        render(
            <InnerMedsInput 
                onChangeInnerMeds={ onChangeInnerMeds }
            />,
            { wrapper: ({ children }) => <Provider store={ storeMock }>{ children }</Provider>}
        )
        
        const input = screen.getByRole('textbox')
        act( () => input.focus() )
        fireEvent.change( input, { target: { value: `${abrotanum30.name}` }})

        act( () => screen.getByRole('button').click() )

        expect( onChangeInnerMeds ).not.toHaveBeenCalled()
        expect( startAlertMock ).toHaveBeenCalledWith({ 
            ...alertGenericInfo, 
            alertMessage: 'Hay más de un medicamento con el nombre que introdujo'
        })
    }); 
});