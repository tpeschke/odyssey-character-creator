const initialState = {
    bp: 40,
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
    , DEDUCT_BP = "DEDUCT_BP"
    , ADD_BP = "ADD_BP"


export function SETBP (amount) {
    return {
        type: SET_BP,
        payload: amount
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

export function DEDUCTBP (amount) {
    return {
        type: DEDUCT_BP,
        paylod: amount
    }
}

export function ADDBP (amount) {
    return {
        type: ADD_BP,
        paylod: amount
    }
}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case SET_BP: 
            return Object.assign({}, state, {bp: action.payload})
        case SET_SPECIES:
            return Object.assign({}, state, {species: action.payload})
        case SET_SCORES:
            return Object.assign({}, state, {scores: action.payload})
        case DEDUCT_BP:
            return Object.assign({}, state, {bp: state.bp - action.payload})
        case ADD_BP:
            return Object.assign({}, state, {bp: state.bp + action.payload})
        default: return state
    }
}