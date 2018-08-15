const initialState = {
    logged: false,
    bp:
        null,
        // 140,
    species:
        null,
        // { species: "Human" },
    scores:
        null,
        // [{ id: 1, title: 'STR', score: "15.04" },
        // { id: 2, title: 'INT', score: "15.04" },
        // { id: 3, title: 'WIS', score: "15.04" },
        // { id: 4, title: 'DEX', score: "15.04" },
        // { id: 5, title: 'CON', score: "15.04" },
        // { id: 6, title: 'CHA', score: "15.04" },
        // { id: 7, title: 'LKS', score: "15.04" },
        // { id: 8, title: 'REP', score: "15" }],
    rep: null,
    background:
        null,
        // { name: "Sniper" },
    skills: null,
    talents: 
    null,
    // [{id: "1", name: "Ambidextrous", price: 15, multi: "false", __typename: "Talent"}
    // ,{id: "3", name: "Astute Observation", price: 20, multi: "false", __typename: "Talent"}
    // ,{id: "6", name: "Blind-Shooting", price: 40, multi: "false", __typename: "Talent"}],
    profics: 
    null,
    // [{id: "2", name: "Bilingual", price: 5, multi: "true", preReq: []}
    // ,{id: "5", name: "Hiking/Road Marching", price: 4, multi: "false", preReq: []}
    // ,{id: "6", name: "Labourer", price: 1, multi: "false", preReq: []}
    // ,{id: "6", name: "Labourer", price: 1, multi: "false", preReq: []}],
    special:
        null,
    // [{
    //     id: "hg1wu",
    //     name: "Stick",
    //     type: "m",
    //     atk: [true, true, false, false, false],
    //     dam: [false, false, false, false, false],
    //     def: [false, false, false, false, false],
    //     spd: [false, false, false, false, false]
    // }, {
    //     id: "hghnnn",
    //     name: "Another stick, I guess",
    //     type: "r",
    //     atk: [true, true, false, false, false],
    //     dam: [false, false, false, false, false],
    //     def: [true, false, false, false, false],
    //     spd: [false, false, false, false, false]
    // }, {
    //     id: "hgfkop",
    //     name: "Gunsword",
    //     type: "m",
    //     atk: [true, true, false, false, false],
    //     dam: [false, false, false, false, false],
    //     def: [true, false, false, false, false],
    //     spd: [false, false, false, false, false]
    // }, {
    //     id: "hgfkop",
    //     name: "Gunsword",
    //     type: "m",
    //     atk: [true, true, false, false, false],
    //     dam: [false, false, false, false, false],
    //     def: [true, false, false, false, false],
    //     spd: [false, false, false, false, false]
    // }, {
    //     id: "hgfgg",
    //     name: "Gun",
    //     type: "r",
    //     atk: [true, true, false, false, false],
    //     dam: [false, false, false, false, false],
    //     def: [true, false, false, false, false],
    //     spd: [false, false, false, false, false]
    // }, {
    //     id: "hgfkop",
    //     name: "Gunsword",
    //     type: "m",
    //     atk: [true, true, false, false, false],
    //     dam: [false, false, false, false, false],
    //     def: [true, false, false, false, false],
    //     spd: [false, false, false, false, false]
    // }],
    hp:
        null,
        // 15,
    credits:
        null,
        // 15000,
    equipment: null,
    priors: null,
    select: null,
    qf: 
    null,
    // [{id: "115", name: "Pocking", bp: 20, __typename: "Quirk", table: "3"}
    // ,{id: "25", name: "Greedy", bp: 15, __typename: "Quirk", table: "2"}
    // ,{id: "134", name: "Hemophilic", bp: 35, __typename: "Quirk", table: "3"}
    // ,{id: "115", name: "Pocking", bp: 20, __typename: "Quirk", table: "3"}
    // ,{id: "25", name: "Greedy", bp: 15, __typename: "Quirk", table: "2"}
    // ,{id: "134", name: "Hemophilic", bp: 35, __typename: "Quirk", table: "3"}
    // ,{id: "25", name: "Greedy", bp: 15, __typename: "Quirk", table: "2"}
    // ,{id: "134", name: "Hemophilic", bp: 35, __typename: "Quirk", table: "3"}],
    record: null
}

const LOG_IN = "LOG_IN"
    , RESET_CHARACTER = "RESET_CHARACTER"
    , SET_BACKGROUND = 'SET_BACKGROUND'
    , SET_BP = "SET_BP"
    , SET_CREDIT = "SET_CREDIT"
    , SET_PROFICS = "SET_PROFICS"
    , SET_EQUIPMENTS = 'SET_EQUIPMENTS'
    , SET_HP = "SET_HP"
    , SET_QF = "SET_QF"
    , SET_SCORES = 'SET_SCORES'
    , SET_SELECTION = 'SET_SELECTION'
    , SET_SPECIALS = "SET_SPECIALS"
    , SET_SPECIES = "SET_SPECIES"
    , SET_TALENTS = "SET_TALENTS"
    , SET_RECORD = "SET_RECORD"
    , ADD_BP = "ADD_BP"
    , ADD_QUIRK = "ADD_QUIRK"
    , DEDUCT_BP = "DEDUCT_BP"
    , SET_PRIORS = 'SET_PRIORS'
    , FINISH_CHARACTER = 'FINISH_CHARACTER'

export function LOGIN () {
    return {
        type: LOG_IN
    }
}

export function RESETCHARACTER() {
    return {
        type: RESET_CHARACTER
    }
}

export function SETBACKGROUND(background) {
    return {
        type: SET_BACKGROUND,
        payload: background
    }
}

export function SETBP(amount) {
    return {
        type: SET_BP,
        payload: amount
    }
}

export function SETCREDIT(credits) {
    return {
        type: SET_CREDIT,
        payload: credits
    }
}

export function SETEQUIPMENTS(goods) {
    return {
        type: SET_EQUIPMENTS,
        payload: goods
    }
}

export function SETPRIORS(prior, param) {
    return {
        type: SET_PRIORS,
        payload: prior
    }
}

export function SETPROFICS(profics) {
    return {
        type: SET_PROFICS,
        payload: profics
    }
}

export function SETHP(hp) {
    return {
        type: SET_HP,
        payload: hp
    }
}

export function SETQF() {
    return {
        type: SET_QF
    }
}

export function SETSPECIES(alien) {
    return {
        type: SET_SPECIES,
        payload: alien
    }
}

export function SETSCORES(scores, param) {
    return {
        type: SET_SCORES,
        payload: scores,
        option: param
    }
}

export function SETSPECIALS(specials) {
    return {
        type: SET_SPECIALS,
        payload: specials
    }
}

export function SETTALENTS(talents) {
    return {
        type: SET_TALENTS,
        payload: talents
    }
}

export function SETRECORD() {
    return {
        type: SET_RECORD
    }
}

export function DEDUCTBP(amount) {
    return {
        type: DEDUCT_BP,
        payload: amount
    }
}

export function ADDBP(amount) {
    return {
        type: ADD_BP,
        payload: amount
    }
}

export function ADDQUIRK(quirk) {
    return {
        type: ADD_QUIRK,
        payload: quirk
    }
}

export function FINISHCHARACTER() {
    return {
        type: FINISH_CHARACTER
    }
}

export function SETSELECTION(choice) {
    return {
        type: SET_SELECTION,
        payload: choice
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return Object.assign({}, state, {logged: !state.logged})
        case RESET_CHARACTER:
            return Object.assign({}, initialState, {logged: true})
        case SET_BACKGROUND:
            return Object.assign({}, state, { background: action.payload })
        case SET_BP:
            return Object.assign({}, state, { bp: action.payload })
        case SET_CREDIT:
            return Object.assign({}, state, { credits: action.payload })
        case SET_EQUIPMENTS:
            return Object.assign({}, state, { equipment: action.payload })
        case SET_PRIORS:
            return Object.assign({}, state, { priors: action.payload })
        case SET_PROFICS:
            return Object.assign({}, state, { profics: action.payload })
        case SET_HP:
            return Object.assign({}, state, { hp: action.payload })
        case SET_QF:
            return Object.assign({}, state, { qf: [] })
        case SET_SELECTION:
            return Object.assign({}, state, { select: action.payload })
        case SET_SPECIALS:
            return Object.assign({}, state, { special: action.payload })
        case SET_SPECIES:
            return Object.assign({}, state, { species: action.payload })
        case SET_SCORES:
            let newObj;
            if (action.option) {
                newObj = { [action.option]: true, scores: action.payload }
            } else {
                newObj = { scores: action.payload }
            }
            return Object.assign({}, state, newObj)
        case SET_TALENTS:
            return Object.assign({}, state, { talents: action.payload })
        case SET_RECORD:
            return Object.assign({}, state, { record: true })
        case DEDUCT_BP:
            return Object.assign({}, state, { bp: state.bp - +action.payload })
        case ADD_BP:
            return Object.assign({}, state, { bp: state.bp + +action.payload })
        case ADD_QUIRK:
            return Object.assign({}, state, { qf: [...state.qf, action.payload] })
        case FINISH_CHARACTER:
            return Object.assign({}, state, {
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
                select: null,
                qf: null,
                record: null
            })
        default: return state
    }
}
