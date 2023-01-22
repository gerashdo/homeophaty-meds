import { fireEvent, render, screen } from "@testing-library/react";
import { DinamicSelector } from "../../../src/components/iterface/DinamicSelector";
import { abrotanum30, calendula200, calendula30 } from "../../fixtures/meds";


describe('Tests for <DinamicSelector />', () => {
    const resetValues = [ abrotanum30, calendula200, calendula30 ]
    const onSetValue = jest.fn()

    test('should render the component properly', () => {
        render( <DinamicSelector 
            resetValues={ resetValues }
            onSetValue={ onSetValue }
        /> )

        expect( screen.getAllByRole("listitem").length ).toBe( resetValues.length )
    });

    test('should show no result message when there is not coincidences', () => {
        render( <DinamicSelector 
            resetValues={ resetValues }
            valueForFilter="no coincidence"
            onSetValue={ onSetValue }
        /> )
        
        expect( screen.getByTestId('no-results') ).toBeTruthy()
    });

    test('should call onSetValue and onSetValueId when an lisitem is clicked down', () => {
        render( <DinamicSelector 
            resetValues={ resetValues }
            onSetValue={ onSetValue }
        /> )
        
        const firstResult = screen.getAllByRole('listitem')[0]
        fireEvent.mouseDown( firstResult )
        expect( onSetValue ).toBeCalled()
    });
});