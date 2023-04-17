import { createContext } from 'react';

interface ValueContextType {
    valuesRadio    : boolean;
    setValuesRadio : ( value: boolean ) => void;
}  

  // export const ValueContext = createContext<ValueContextType | undefined>(undefined);
  export const ValueContext = createContext<ValueContextType | any>(true); 