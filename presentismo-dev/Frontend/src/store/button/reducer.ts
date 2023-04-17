const initialState = { botton: '' };

interface actionType {
    type    : string;
    payload : string;
}

export default ( state = initialState, action: actionType ) => {
    switch (action.type) {
        case 'COMENZAR_DIA':
            return {
                ...state,
                button: action.payload,
            }
        case 'PAUSAR': 
            return {
                ...state,
                button: action.payload,
            }
        case 'REANUDAR':
            return {
                ...state,
                button: action.payload,
            }
            
        case 'FINALIZAR_DIA':
            return {
                ...state,
                button: action.payload,
            }
        default:
            return state;
    }
};