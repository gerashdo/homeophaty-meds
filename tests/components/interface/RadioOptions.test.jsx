import { fireEvent, render, screen } from "@testing-library/react";
import { RadioOptions } from "../../../src/components/iterface/RadioOptions";

describe('Tests for <RadioOptions />', () => {
    const options = [ 'a', 'b', 'c', 'd' ]
    const onChange = jest.fn()
    

    test('should render the component correctly', () => {
        const value = ''
        const { container } = render(
            <RadioOptions 
                options={ options }
                value={ value }
            />
        )

        expect( screen.queryAllByRole('radio').length ).toBe( options.length )
        expect( container ).toMatchSnapshot()
    });

    test('should set as checked the option that is equal to the value', () => {
        let value = options[ 0 ]
        const { rerender } = render(
            <RadioOptions 
                options={ options }
                value={ value }
            />
        )

        const optionOne = screen.getByRole('radio', { name: options[ 0 ] })
        const optionTwo = screen.getByRole('radio', { name: options[ 1 ] })
        expect( optionOne ).toBeChecked()
        expect( optionTwo ).not.toBeChecked()

        
        value = options[ 1 ]
        rerender(
            <RadioOptions 
                options={ options }
                value={ value }
            />
        )

        expect( optionOne ).not.toBeChecked()
        expect( optionTwo ).toBeChecked()
    });

    test('should call onChange function when a option is clicked', () => {
        const value = options[ 0 ]
        render(
            <RadioOptions 
                options={ options }
                value={ value }
                onChange={ onChange }
            />
        )
        
        fireEvent.click( screen.getByRole( 'radio', { name: options[ 1 ] } ) )
        expect( onChange ).toHaveBeenCalled()
    });

});