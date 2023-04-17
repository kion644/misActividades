var  INICIO = "Inicio de actividades";

var FINALIZAR = "Finalizar actividades";

var PAUSAR = "Pausar actividades";

var REANUDAR = "Reanudar actividades";

const comenzar = () => {
    return {
        type: 'COMENZAR_DIA',
        payload: INICIO
    };
};

const pausar = () => {
    return {
        type: 'PAUSAR',
        payload: PAUSAR
    };
};

const reanudar = () => {
    return {
        type: 'REANUDAR',
        payload: REANUDAR
    };
};

const finalizar = () => {
    return {
        type: 'FINALIZAR_DIA',
        payload: FINALIZAR
    };
};

export {
    comenzar, 
    pausar,
    reanudar,
    finalizar
};