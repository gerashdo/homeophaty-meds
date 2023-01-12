import { medicineTypes } from "../../src/helpers/medicineTypes";


export const abrotanum30 = {
    name: 'Abrotanum',
    ch: '30',
    id: 1,
    description: 'Es abrotanum 30',
    medicines: [],
    type: medicineTypes.Medicamento
}

export const abrotanum30Updated = {
    name: 'Abrotanum',
    ch: '30',
    id: 1,
    description: 'Es abrotanum pero actualizado',
    medicines: [],
    type: medicineTypes.Medicamento
}

export const calendula30 = {
    name: 'Calendula',
    ch: '30',
    id: 2,
    description: 'Es calendula 30',
    medicines: [],
    type: medicineTypes.Medicamento
}

export const calendula200 = {
    name: 'Calendula',
    ch: '200',
    id: 3,
    description: 'Es calendula 200',
    medicines: [],
    type: medicineTypes.Medicamento
}

export const initialState = {
    isLoading: false,
    page: 0,
    medicamentos: [],
    searchValue: ''
}

export const medsListFixture = [ abrotanum30, calendula200, calendula30 ]

export const setMedicinesState = {
    isLoading: false,
    page: 1,
    medicamentos: [ abrotanum30, calendula200, calendula30 ],
    searchValue: ''
}

export const oneMedicineState = {
    isLoading: false,
    page: 0,
    medicamentos: [ abrotanum30 ],
    searchValue: ''
}
