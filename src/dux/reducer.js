const initialState = {
    bp: null,
    spcies: null
}

const SET_BP = "SET_BP"
    , SET_SPECIES = "SET_SPECIES"


export function SETBP () {
    return {
        type: SET_BP
    }
}

export function SETSPECIES (alien) {
    return {
        type: SET_SPECIES,
        payload: alien
    }
}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case SET_BP: 
            return Object.assign({}, state, {bp: 40})
        case SET_SPECIES:
            return Object.assign({}, state, {species: action.payload})
        default: return state
    }
}