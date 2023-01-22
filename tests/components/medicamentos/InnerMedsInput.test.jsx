import { configureStore } from "@reduxjs/toolkit";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { InnerMedsInput } from "../../../src/components/medicamentos/InnerMedsInput";
import { medicamentoSlice } from "../../../src/store/slices/medicamentos";
import { abrotanum200, abrotanum30, medsListFixture } from "../../fixtures/meds";

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
    
    const onChangeInnerMeds = jest.fn()

    // test('should render the component', () => {

    //     const storeMock = getMockStore({ medicamentos: medsListFixture })

    //     render(
    //         <InnerMedsInput 
    //             onChangeInnerMeds={ onChangeInnerMeds }
    //         />,
    //         { wrapper: ({ children }) => <Provider store={ storeMock }>{ children }</Provider>}
    //     )

    //     screen.debug()
    // });

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

    test('should add the call onChangeInnerMeds if the medicine is not in the innerMeds', () => {
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
});