import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';



interface propUser {
    password : string;
    setPassword : (value :string)=> void;
    error:boolean;
    onClick : (  ) => void;
  }

export const InputPassword = ({password , setPassword,error,onClick  }:propUser ) => {

 
    const handleInputChange = (e:any) => {
        setPassword( e.target.value );
 
    }

    return (
        <div >
            
            <TextField required 
              id="pass-input-with-icon-textfield"
              label="Contraseña"
              placeholder="Contraseña"
              type="password"
              defaultValue=""
              error={error}
              onChange= {handleInputChange}
              onKeyPress={(e)=>{
                if(e.key==='Enter'){
                  onClick()
                }
              }}
              InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                <LockIcon />
                </InputAdornment>
                ),
              }}
            />  
         
            
      </div>
    )
}