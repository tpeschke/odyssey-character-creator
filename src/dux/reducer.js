const initialState = {
    bp: null,
    species: null,
    scores: null,
    rep: null,
    background: null,
    skills: null,
    talents: null,
    profics: null,
    special: null,
    hp: null,
    credits: null,
    equipment: null,
    priors: null,
    qf: null,
    record: null,
}

const SET_BACKGROUND = 'SET_BACKGROUND'
    , SET_BP = "SET_BP"
    , SET_CREDIT = "SET_CREDIT"
    , SET_PROFICS = "SET_PROFICS"
    , SET_HP = "SET_HP"
    , SET_SCORES = 'SET_SCORES'
    , SET_SPECIES = "SET_SPECIES"
    , SET_TALENTS = "SET_TALENTS"
    , ADD_BP = "ADD_BP"
    , DEDUCT_BP = "DEDUCT_BP"

export function SETBACKGROUND (background) {
        return {
            type: SET_BACKGROUND,
            payload: background
        }
    }
    
export function SETBP (amount) {
    return {
        type: SET_BP,
        payload: amount
    }
}

export function SETCREDIT (credits) {
    return {
        type: SET_CREDIT,
        payload: credits
    }
}

export function SETPROFICS (profics) {
    return {
        type: SET_PROFICS,
        payload: profics
    }
}

export function SETHP (hp) {
    return {
        type: SET_HP,
        payload: hp
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

export function SETTALENTS (talents) {
    return {
        type: SET_TALENTS,
        payload: talents
    }
}

export function DEDUCTBP (amount) {
    return {
        type: DEDUCT_BP,
        payload: amount
    }
}

export function ADDBP (amount) {
    return {
        type: ADD_BP,
        payload: amount
    }
}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case SET_BACKGROUND:
            return Object.assign({}, state, {background: action.payload})
        case SET_BP: 
            return Object.assign({}, state, {bp: action.payload})
        case SET_CREDIT:
            return Object.assign({}, state, {credits: action.payload})
        case SET_PROFICS:
            return Object.assign({}, state, {profics: action.payload})
        case SET_HP:
            return Object.assign({}, state, {hp: action.payload})
        case SET_SPECIES:
            return Object.assign({}, state, {species: action.payload})
        case SET_SCORES:
            return Object.assign({}, state, {scores: action.payload})
        case SET_TALENTS:
            return Object.assign({}, state, {talents: action.payload})
        case DEDUCT_BP:
            return Object.assign({}, state, {bp: state.bp - +action.payload})
        case ADD_BP:
            return Object.assign({}, state, {bp: state.bp + +action.payload})
        default: return state
    }
}