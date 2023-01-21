
export const alertTypes = {
    SUCCESS: 'success',
    ERROR: 'error',
}

export const initialState = {
    alertActive: false,
    alertMessage: '',
    alertType: null,
    alertDuration: 8,
    page: 1,
    totalPages: null,
}

export const uiAlert = {
    alertMessage: 'this is a message',
    alertType: alertTypes.SUCCESS,
}

export const stateWithActiveAlert = {
    alertActive: true,
    alertMessage: uiAlert.alertMessage,
    alertType: uiAlert.alertType,
    alertDuration: 8,
    page: 1,
    totalPages: null,
}

export const paginateInfo = {
    page: 3,
    totalPages: 10
}

