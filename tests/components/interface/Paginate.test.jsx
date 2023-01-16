import { fireEvent, render, screen } from "@testing-library/react";
import { Paginate } from "../../../src/components/iterface/Paginate";


describe('test for <Paginate /> component', () => {
    const onClickItem = jest.fn()
    const totalPages = 10

    test('should render the component properly', () => {
        const currentPage = 1

        const { container } = render( <Paginate 
            onClickItem={ onClickItem }
            totalPages={ totalPages }
            currentPage={ currentPage }
        /> )

        expect( container ).toMatchSnapshot()
    });

    test('should call the onClickItem function if a item is clicked', () => {
        const currentPage = 1

        render( <Paginate 
            onClickItem={ onClickItem }
            totalPages={ totalPages }
            currentPage={ currentPage }
        /> )

        fireEvent.click( screen.getAllByTestId('item-container')[1] )

        expect( onClickItem ).toHaveBeenCalled()
    });
});