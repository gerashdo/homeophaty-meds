import { configureStore } from "@reduxjs/toolkit";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { InnerMedsForm } from "../../../src/components/medicamentos/InnerMedsForm";
import { medicamentoSlice } from "../../../src/store/slices/medicamentos";
import { abrotanum30, medsListFixture } from "../../fixtures/meds";

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

describe('Tests for <InnerMedsForm /> component', () => {
    const onRemoveInnerMeds = jest.fn()
    const onChangeInnerMeds = jest.fn()

    test('should render the component correctly', () => {
        const mockStore = getMockStore({ medicamentos: medsListFixture })

        const { container } = render( <InnerMedsForm 
            innerMeds={ medsListFixture }
            onRemoveInnerMeds={ onRemoveInnerMeds }
            onChangeInnerMeds={ onChangeInnerMeds }
        />, {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        })

        expect( container ).toMatchSnapshot()
    });

    test('should call onChangeInnerMeds if a medicine is added to the inner meds', () => {
        const mockStore = getMockStore({ medicamentos: medsListFixture })

        const { queryByRole } = render( <InnerMedsForm
            onRemoveInnerMeds={ onRemoveInnerMeds }
            onChangeInnerMeds={ onChangeInnerMeds }
        />, {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        })

        const input = queryByRole('textbox')
        act( () => {
            input.focus()
            fireEvent.change( input, { target: { value: `${ abrotanum30.name }` }} )
            queryByRole('button').click()
        })

        expect( onChangeInnerMeds ).toHaveBeenCalledWith( abrotanum30 )
    });
});