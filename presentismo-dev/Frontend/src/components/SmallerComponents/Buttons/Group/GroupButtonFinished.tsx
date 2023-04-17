import { ButtonPrimary } from '../Primary/ButtonPrimary';

interface props {
  
    cancelDisable       : boolean;
    handleClickCancel  : () => void;
    finishDisable       : boolean;
    handleClickFinish : () => void;
}

export const GroupButtonFinished = ({ cancelDisable, handleClickCancel, finishDisable, handleClickFinish}: props) => {
    return (
        <>
            <ButtonPrimary 
                text= 'Cancelar'   
                disabled = { cancelDisable } 
                onClick={ handleClickCancel }
            /> 
            <ButtonPrimary 
                text="Confirmar"  
                disabled = { finishDisable } 
                onClick={ handleClickFinish }

            /> 
        </>
    )
}
