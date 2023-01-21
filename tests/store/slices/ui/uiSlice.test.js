import { setPageInformation, startAlert, stopAlert, uiSlice } from "../../../../src/store/slices/ui";
import { initialState, paginateInfo, stateWithActiveAlert, uiAlert } from "../../../fixtures/uiSliceFixtures";


describe('Tests for uiSlice', () => {

    test('should return the initial state', () => {
        expect( uiSlice.getInitialState() ).toStrictEqual( initialState )
    });

    test('should start and alert', () => {
        const state = uiSlice.reducer( initialState, startAlert( uiAlert ))

        expect( state ).toEqual({ 
            ...initialState, 
            alertMessage: uiAlert.alertMessage,
            alertType: uiAlert.alertType,
            alertActive: true,
        })
    });

    test('if a time is provided it shoul set it to the alertDuration', () => {
        const alertDuration = 10
        const state = uiSlice.reducer( initialState, startAlert({ ...uiAlert, alertDuration }))

        expect( state ).toEqual({ 
            ...initialState, 
            alertMessage: uiAlert.alertMessage,
            alertType: uiAlert.alertType,
            alertActive: true,
            alertDuration,
        })
    });

    test('should stop an alert', () => {
        const state = uiSlice.reducer( stateWithActiveAlert, stopAlert)

        expect( state ).toEqual({ 
            ...stateWithActiveAlert,
            alertActive: false,
        })
    });

    test('should set the pagination information', () => {
        const state = uiSlice.reducer( initialState, setPageInformation( paginateInfo ))

        expect( state ).toEqual({
            ...initialState,
            page: paginateInfo.page,
            totalPages: paginateInfo.totalPages,
        })
    });
});