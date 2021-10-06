import axios from "axios";
import { GET_DOGS, FILTER_TEMPERAMENTS, FILTER_TEMPERAMENTS_ACTION, ORDEN, GET_DOG, CLEAR_DOG, DOGS_MATCH} from "./types";


export function getDogs(name){
    return async function(dispatch){
        let json;
        
        try{
        if(!name){
            
            json = await axios.get(`http://localhost:3001/dogs`)
        }else{
            json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
        }
        
        return dispatch({ type: GET_DOGS, payload: json.data });
        }catch(error){
            return dispatch({ type: GET_DOGS, payload: error.response?.data });
        }
    }
} 

export function dogsMatch(name){
    return async function(dispatch){
        let json;
        
        try{
        
            json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
        
        
        return dispatch({ type: DOGS_MATCH, payload: json.data });
        }catch(error){
            return dispatch({ type: DOGS_MATCH, payload: error.response?.data });
        }
    }
} 
export function filterTemperaments(){
    return async function(dispatch){
        try{
        let json = await axios.get(`http://localhost:3001/temperament`)
        
        return dispatch({ type: FILTER_TEMPERAMENTS, payload: json.data });
        }catch(error){
            return dispatch({ type: FILTER_TEMPERAMENTS, payload: error.response?.data });
        }
        
    }
} 

export function filterTemperamentsAction(payload){
    return{ type: FILTER_TEMPERAMENTS_ACTION, payload};    
}


export function orden(payload){
    return{ type: ORDEN, payload};    
}


export function postDog(payload){
    return async function(dispatch){
        try{ 
            const json = await axios.post(`http://localhost:3001/dog`,payload);
            alert(json.data)
        }catch(error){
            alert(error.response?.data)
        }

        }
} 

export function getDog(id){
    if(id){
    return async function(dispatch){
        try{
            let json = await axios.get(`http://localhost:3001/dogs/`+id)
            return dispatch({ type: GET_DOG, payload: json.data });

        }catch(error){
            return dispatch({ type: GET_DOG, payload: error.response?.data });
        }
        
    }
    }
    return {type: CLEAR_DOG}
}


