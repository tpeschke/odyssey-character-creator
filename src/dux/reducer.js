const initialState = {
    bp: 40,
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
    , SET_EQUIPMENTS = 'SET_EQUIPMENTS'
    , SET_HP = "SET_HP"
    , SET_QFS = 'SET_QFS'
    , SET_SCORES = 'SET_SCORES'
    , SET_SPECIES = "SET_SPECIES"
    , SET_TALENTS = "SET_TALENTS"
    , SET_RECORD = "SET_RECORD"
    , ADD_BP = "ADD_BP"
    , DEDUCT_BP = "DEDUCT_BP"
    , SET_PRIORS = 'SET_PRIORS'

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

export function SETEQUIPMENTS (goods) {
    return {
        type: SET_EQUIPMENTS,
        payload: goods
    }
}

export function SETPRIORS (prior, param) {
    return {
        type: SET_PRIORS,
        payload: prior
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

export function SETQFS (qf) {
    return {
        type: SET_QFS,
        payload: qf
    }
}

export function SETSPECIES (alien) {
    return {
        type: SET_SPECIES,
        payload: alien
    }
}

export function SETSCORES (scores, param) {
    return {
        type: SET_SCORES,
        payload: scores,
        option: param
    }
} 

export function SETTALENTS (talents) {
    return {
        type: SET_TALENTS,
        payload: talents
    }
}

export function SETRECORD () {
    return {
        type: SET_RECORD
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
        case SET_EQUIPMENTS:
            return Object.assign({}, state, {equipment: action.payload})
        case SET_PRIORS:
            return Object.assign({}, state, {priors: action.payload})
        case SET_PROFICS:
            return Object.assign({}, state, {profics: action.payload})
        case SET_QFS:
            return Object.assign({}, state, {qf: action.payload})
        case SET_HP:
            return Object.assign({}, state, {hp: action.payload})
        case SET_SPECIES:
            return Object.assign({}, state, {species: action.payload})
        case SET_SCORES:
            let newObj;
            if (action.option) {
               newObj = {[action.option] : true, scores: action.payload}
            } else {
                newObj = {scores: action.payload}
            }
            return Object.assign({}, state, newObj)
        case SET_TALENTS:
            return Object.assign({}, state, {talents: action.payload})
        case SET_RECORD:
            return Object.assign({}, state, {record: true})
        case DEDUCT_BP:
            return Object.assign({}, state, {bp: state.bp - +action.payload})
        case ADD_BP:
            return Object.assign({}, state, {bp: state.bp + +action.payload})
        default: return state
    }
}