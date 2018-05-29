const initialState = {
    bp: null,
    species: null,
    scores: null
}

const SET_BP = "SET_BP"
    , SET_SPECIES = "SET_SPECIES"
    , SET_SCORES = 'SET_SCORES'


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

export function SETSCORES (scores) {
    return {
        type: SET_SCORES,
        payload: scores
    }
} 

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case SET_BP: 
            return Object.assign({}, state, {bp: 40})
        case SET_SPECIES:
            return Object.assign({}, state, {species: action.payload})
        case SET_SCORES:
            console.log(action.payload)
            return Object.assign({}, state, {scores: action.payload})
        default: return state
    }
}