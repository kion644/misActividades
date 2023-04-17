import React, { useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useState } from 'react';
import { Skeleton } from '@material-ui/lab';
import { licencia } from '../../../../models/Licencia';
import { RadioButtonsNew } from '../RadioButtons/RadioButtonsNew';



interface props {
  
   data:licencia[];
   value:string;
   setValue:(value:string)=>void;
   disable:boolean;
    setLabel:(value:string)=>void;
    label:string;
}

const useStyles = makeStyles({
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'left',
      
    },
    text: {
        color: '#B2B2B2',
        fontSize: '100%',
        width: '67%',
        justifyContent: 'flex-start ',
        marginLeft: '9.2%',
        padding: '3%'
    },
    radioGroup: {
        width: '80%',
        justifyContent: 'space-around',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
        marginTop: '1rem',
        marginBottom: '1.75rem',
        marginLeft: '10%',
        marginRight: '10%',
        color: '#555559'

    },
    scroll: {
        overflowY: 'scroll'
    },
});

export const RadioButtonsGroupGeneric = ({data,value,setValue,disable,setLabel,label}:props) => {

    const classes = useStyles();
    const [cargue, setCargue] = useState(false);
   

    useEffect(() => {
        async function isCarge() {
            if (data!=null){
                setCargue(true);
            }    
        }
        isCarge();   
         
     
    }, [data]);



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    
      data.forEach((lic)=>{
        if(lic.id.toString() == event.target.value){
         setLabel(lic.nombre)
        } 
      });
    };

    return (
        <div>

            {cargue ? (

                data &&
          
                <Grid container>
                    
                    <FormControl className={classes.container} component="fieldset">
                       
                        <Grid item xs={12}>
                        <RadioGroup
                            className={classes.radioGroup}
                            value={value}
                            onChange={handleChange}
                        >{cargue ? (
                            data.map((a: any) =>
                                <Grid item xs={12}>
                                <RadioButtonsNew
                                    value={a.id}
                                    label={a.nombre}
                                    disabled={disable}
                                />
                                </Grid>
                            )
                           
                        ) : (
                            <Skeleton className={classes.radioGroup} animation="wave" variant='rect' />
                        )}
                        </RadioGroup>
                        </Grid>
                    </FormControl>
                   
                </Grid>
              
            ) : (

                <div>
                    <Skeleton />
                    <Skeleton animation={false} />
                    <Skeleton animation="wave" />
                    <Skeleton />
                    <Skeleton animation={false} />
                    <Skeleton animation="wave" />
                    <Skeleton />

                </div>
            )}
        </div>
    )
}