const initialState = {
    bp: null,
    species: null,
    scores: {cha:"16.1",
        con:"17.77",
        dex:"8.66",
        int:"14.4",
        lks:"14.10",
        str:"8.46",
        wis:"6.60"}
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
            return Object.assign({}, state, {scores: action.payload})
        default: return state
    }
}