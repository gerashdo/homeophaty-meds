import { fireEvent, render, screen } from "@testing-library/react";
import { MedSmallCard } from "../../../src/components/medicamentos/MedSmallCard";


describe('Tests for <MedSmallCard />', () => {

    const medicamento = { name: "Nombre", ch: "30"}
    const onCloseInnerMed = jest.fn()

    test('It should render the component', () => {
        render( <MedSmallCard medicamento={ medicamento }  onCloseInnerMed={ onCloseInnerMed } /> )

        expect( screen.getByText( `${ medicamento.name } ${ medicamento.ch }` ) ).toBeTruthy()
    });

    test('should render the x to close if the param isDelete is true', () => {
        render( 
            <MedSmallCard 
                medicamento={ medicamento }  
                onCloseInnerMed={ onCloseInnerMed }
                isDelete={ true }
            /> 
        )

        expect( screen.getByTestId( 'cancel-button') ).toBeTruthy()
    });

    test('should call onCloseInnerMed when click on the x', () => {
        render(
            <MedSmallCard 
                medicamento={ medicamento }  
                onCloseInnerMed={ onCloseInnerMed }
                isDelete={ true }
            /> 
        )

        fireEvent.click( screen.getByTestId( 'cancel-button') )
        expect( onCloseInnerMed ).toBeCalledTimes(1)
    });
});