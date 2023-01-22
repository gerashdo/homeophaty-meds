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

export const ignatia30 = {
    name: 'Ignatia',
    ch: '30',
    id: 4,
    description: 'Es ignatia 30',
    medicines: [],
    type: medicineTypes.Medicamento
}

export const abrotanum200 = {
    name: 'Abrotanum',
    ch: '200',
    id: 5,
    description: 'Es abrotanum 200',
    medicines: [],
    type: medicineTypes.Medicamento
}

export const initialState = {
    isLoading: false,
    medicamentos: [],
    searchValue: ''
}

export const medsListFixture = [ abrotanum30, calendula200, calendula30 ]

export const setMedicinesState = {
    isLoading: false,
    medicamentos: [ abrotanum30, calendula200, calendula30 ],
    searchValue: ''
}

export const oneMedicineState = {
    isLoading: false,
    medicamentos: [ abrotanum30 ],
    searchValue: ''
}
