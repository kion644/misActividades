import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Chip, Grid, Typography } from '@material-ui/core';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
    button: {
      color: '#FFF',
      backgroundColor: '#007DC4',
      '&:hover': {
        backgroundColor: '#F6921E'
      }
    }
  }),
);
interface props {
 
  setFile: (value: FormData) => void;
  label:string;
  files:FormData|undefined;
  setLabel:(value:any)=>void;

}
export default function UploadButtons({ files,setFile,label,setLabel}: props) {

  const classes = useStyles();
  const [isSelected, setIsSelected] = useState(false);
  const changeHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files

    if (!fileList) return;
   
    const formData = new FormData();
    formData.append('file', fileList[0])
  
    setFile(formData);
    setIsSelected(true)
    
    setLabel(fileList[0].name)
  
  }
  const  handleDelete =()=>{
    if (files===undefined) return
    files.delete('file')
    setLabel('')
    
  }

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={changeHandler}

      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Subir archivo(s)
        </Button>
      </label>
      <div>
        {isSelected ? (
          <Grid container spacing={1}>
            {label === '' ? '' :

              // file.map((label) => (
              <Grid item >
                <Chip label={label}  color="primary" onDelete={handleDelete}/>
              </Grid>
              // ))
            }
          </Grid>

        ) : (<></>)}
      </div>

    </div>
  );
}