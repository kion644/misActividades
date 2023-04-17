import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

interface propUser {
  usuario: string;
  setUsuario: (value: string) => void;
  error: boolean;
  onKeyPress : (  ) => void;

}

export const InputUsers = ({ usuario, setUsuario, error, onKeyPress }: propUser) => {

  const handleInputChange = (e: any) => {
    setUsuario(e.target.value);

  }


  return (
    <form >
      <TextField required
        id="input-with-icon-textfield"
        label="Usuario o E-Mail"
        placeholder="usuario@cdainfo.com"
        error={error}
        defaultValue=""
        onKeyPress={(e)=>{
          if(e.key==='Enter'){
            onKeyPress()
          }
        }}
        onChange={handleInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),

        }}
      />
    </form>
  )
} 