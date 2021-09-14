import {
    GET_DOGS,
    FILTER_TEMPERAMENTS,
    FILTER_TEMPERAMENTS_ACTION,
    ORDEN,
    POST_DOG,
    GET_DOG,
    CLEAR_DOG
} from "../Actions/types";

const initialState = {
    dogs: [],
    dogsAux: [],
    temperaments: [],
    dog: []
};


function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_DOGS:
            return {...state, dogs: payload, dogsAux: payload };
        case FILTER_TEMPERAMENTS:
            return {...state, temperaments: payload };
        case FILTER_TEMPERAMENTS_ACTION:
            let r;
            const aux = state.dogsAux;
            if (payload.DBoPi === "creada") {
                r = aux.filter(d => d.db === true);
            } else if (payload.DBoPi === "existente") {

                r = aux.filter(d => d.db === undefined);

            } else { r = aux }
            let resultado;
            let res = [];
            let ultado;
            if (payload.temp === "todos" || payload.temp === "") {
                resultado = r
            } else {
                for (let i = 0; i < r.length; i++) {
                    if (r[i].db) {
                        for (let j = 0; j < r[i].temperaments.length; j++)
                            if (r[i].temperaments[j].name === payload.temp) {
                                res.push(r[i])
                            }
                    }
                }
                ultado = r.filter(d => !d.db && d.temperament?.includes(payload.temp));
                resultado = res.concat(ultado)
            }

            return {...state, dogs: resultado };
        case ORDEN:
            let ord;
            if (payload === "ascendente") {
                ord = state.dogs.sort(function(a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })

            } else if (payload === "descendente") {
                ord = state.dogs.sort(function(a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            } else if (payload === "menor-mayor") {
                let array = state.dogs;
                let auxiliar = 0;
                let r = 0;

                for (let i = 1; i < array.length; i++) {
                    for (let j = 0; j < i; j++) {
                        if (parseInt(array[i].weight.split(" ")[2]) < parseInt(array[j].weight.split(" ")[2])) {
                            auxiliar = array[i];
                            r = i;

                            while (r > j) {
                                array[r] = array[r - 1];
                                r--;
                            }
                            array[j] = auxiliar;
                        }
                    }
                }
                ord = array;

            } else if (payload === "mayor-menor") {
                let array = state.dogs;
                let auxiliar = 0;
                let r = 0;

                for (let i = 1; i < array.length; i++) {
                    for (let j = 0; j < i; j++) {
                        if (parseInt(array[i].weight.split(" ")[2]) > parseInt(array[j].weight.split(" ")[2])) {
                            auxiliar = array[i];
                            r = i;

                            while (r > j) {
                                array[r] = array[r - 1];
                                r--;
                            }
                            array[j] = auxiliar;
                        }
                    }
                }
                ord = array;
            } else if (payload === "") {
                ord = state.dogs
            }
            return {...state, dogs: ord };
        case POST_DOG:
            return {...state };
        case GET_DOG:
            return {...state, dog: payload };
        case CLEAR_DOG:
            return {...state, dog: [] };
        default:
            return state;
    }
}

export default reducer;