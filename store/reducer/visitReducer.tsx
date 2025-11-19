import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

// Define types for the slice state
interface Prescription {
    id: any,
    name: string,
    qty: string,
    time: string
}

interface Report{
    id: any,
    name: string,
    image: any,
}
interface Patient {
    id: any,
    visitId: any,
    name: string | null,
    emr: string | null,
    nic: string | null,
    age: number | null,
    gender: string | null,
    symptoms: string[] | null,
    comments: string | null,
    instruction: string | null,
    prescription: Prescription[] | null
    report: Report[] | null
}

interface Visit {
    id: any,
    marveeName: string,
    district: string,
    area: string,
    date:Date,
    patients: Patient[] | null
}

interface VisitState {
    visits: Visit[]
}

// Define the initial state using that type
const initialState: VisitState = {
    visits: []
}

export const visitSlice = createSlice({
    name: 'visit',
    initialState,
    reducers: {
        getVisits: (state, action: PayloadAction<Visit[]>) => {
            state.visits = action.payload
        },
        addNewVisit: (state, action: PayloadAction<Visit>) => {
            state.visits = [...state.visits, action.payload]
        },
        updateVisit: (state, action: PayloadAction<Visit>) => {
            state.visits = state.visits.map(visit => 
                visit.id === action.payload.id ? action.payload : visit
            )
        },
        addNewPatients: (state, action: PayloadAction<Patient>) => {
            const visitIndex = state.visits.findIndex(visit => visit.id === action.payload.visitId)
            if (visitIndex !== -1) {
                const visit = state.visits[visitIndex]
                if (visit.patients) {
                    visit.patients = [...visit.patients, action.payload]
                } else {
                    visit.patients = [action.payload]
                }
                state.visits[visitIndex] = visit
            }
        }
    },
})

export const { getVisits, addNewVisit, updateVisit, addNewPatients } = visitSlice.actions

export default visitSlice.reducer
