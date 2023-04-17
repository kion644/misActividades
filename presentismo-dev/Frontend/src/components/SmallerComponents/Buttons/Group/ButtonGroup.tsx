import { ButtonPrimary } from '../Primary/ButtonPrimary';

interface props {
    text              : string;
    valuesRadio       : boolean;
    handleClickStart  : () => void;
    valueFinish       : boolean;
    handleClickFinish : () => void;
}

export const ButtonGroup = ({text, valuesRadio, handleClickStart, valueFinish, handleClickFinish}: props) => {
    return (
        <>
            <ButtonPrimary 
                text= { text }   
                disabled = { valuesRadio } 
                onClick={ handleClickStart }
            /> 
            <ButtonPrimary 
                text=" Finalizar "  
                disabled = { valueFinish } 
                onClick={ handleClickFinish }

            /> 
        </>
    )
}
