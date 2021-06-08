import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import uuid from 'react-uuid';
import { CtDiv } from "./StyledComponents";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent:"center",
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background:"transparent",
  },
}));

const DisplayNotes= ({data}) => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Grid container spacing={3} >
          {
            //este mapeo sirve para colocar las notas en cada casilla... resolver tema de ids 

              data.map((savedNotes =>(
                <Grid item xs={12} sm={4} key={savedNotes.group}>
                    {savedNotes.name.map((string)=>(
                        <Paper className={classes.paper} key={uuid()}>
                            <CtDiv as="div" status = {savedNotes.group}>{string}</CtDiv>                            
                        </Paper>                       
                    ))}                         
                </Grid>
              )))
          }     
       </Grid>
    </div>
  );
}

export default DisplayNotes;
