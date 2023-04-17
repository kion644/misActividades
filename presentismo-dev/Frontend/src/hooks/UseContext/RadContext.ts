import { createContext } from 'react';

interface RadioContext {
    valuesRadioContext    : boolean;
    setValuesRadioContext : ( value: boolean ) => void;
} 

export const RadContext = createContext<RadioContext | any>(true);  
