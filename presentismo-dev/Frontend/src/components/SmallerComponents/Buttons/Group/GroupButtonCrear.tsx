import { ButtonPrimary } from '../Primary/ButtonPrimary';

interface props {
  
    cancelDisable       : boolean;
    handleClickCancel  : () => void;
    finishDisable       : boolean;
    handleClickFinish : () => void;
}

export const GroupButtonCrear = ({ cancelDisable, handleClickCancel, finishDisable, handleClickFinish}: props) => {
    return (
        <>
            <ButtonPrimary 
                text= 'Cancelar'   
                disabled = { cancelDisable } 
                onClick={ handleClickCancel }
            /> 
            <ButtonPrimary 
                text="Crear"  
                disabled = { finishDisable } 
                onClick={ handleClickFinish }

            /> 
        </>
    )
}
