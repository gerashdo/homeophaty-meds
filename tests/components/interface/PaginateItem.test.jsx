import { fireEvent, render, screen } from "@testing-library/react";
import { PaginateItem } from "../../../src/components/iterface/PaginateItem";


describe('Test for <PaginateItem /> component', () => {
    const number = 2
    const onItemClick = jest.fn()

    test('should render properly', () => {
        const { container } = render( <PaginateItem 
            number={ number }
            onItemClick={ onItemClick }
        />)
        
        expect( screen.getByText( number ) ).toBeTruthy()
        expect( container ).toMatchSnapshot()
    });

    test('should call onItemClick', () => {
        render( <PaginateItem 
            number={ number }
            onItemClick={ onItemClick }
        />)

        fireEvent.click( screen.getByTestId('item-container') )

        expect( onItemClick ).toHaveBeenCalled()
    });

    test('should not have active class if the active argument is not passed in', () => {
        render( <PaginateItem 
            number={ number }
            onItemClick={ onItemClick }
        />)

        const itemContainer = screen.getByTestId('item-container')
        expect( itemContainer.classList.contains('active') ).toBeFalsy()
    });

    test('should set active class if the active argument is passed in', () => {
        render( <PaginateItem 
            number={ number }
            onItemClick={ onItemClick }
            active
        />)

        const itemContainer = screen.getByTestId('item-container')
        expect( itemContainer.classList.contains('active') ).toBeTruthy()
    });
});