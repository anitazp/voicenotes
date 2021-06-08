import {useState, useEffect } from "react";
import micoff from "./images/mic.png"
import micon from "./images/opmic.png"
import { IconButton, Typography } from "@material-ui/core"
import './App.css';
import { CtButton } from "./components/StyledComponents";
import DisplayNotes from "./components/DisplayNotes";


//inicializacion de reconocimiento de voz 
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition(); 


//configuracion de reconocimiento de voz 
mic.continuous = true;
// continuos escucha y va corrigiendo los resultados de manera continua 
mic.interimResults = true;
// mejora la calidad del texto en funcion del contexto. 
mic.lang = "es-MX"
// idioma

function App() {
  const [isListening, setIslistening] = useState(false);
  const [note, setNote] = useState(null);

  // estos states funcionan para clasificar las notas por estado todo, doing, done.
  const [ savedNotestodo, setSavedNotestodo ] = useState([]); 
  const [ savedNotesdoing, setSavedNotesdoing ] = useState([]);
  const [ savedNotesdone, setSavedNotesdone ] = useState([]);

  const savedNotes = [
    {
      group: "todo",
      name: savedNotestodo,
    }, 
    {
      group: "doing",
      name: savedNotesdoing,
    }, 
    {
      group: "done",
      name: savedNotesdone,
    }
  ]


  useEffect(()=>{
    handleListen();
  },[isListening]);

  const handleListen = ()=> {
    if (isListening) {
      mic.start();
      mic.onend = () => {         
        mic.start()
        //abre microfono 
      }
    } else {
      mic.stop();
      mic.onend = () => {        
        //cierra microfono 
      }
    }
    mic.onstart = () => {}
    mic.onresult = (event) => {
      const transcript = Array.from(event.results) //escucha 
        .map(result => result[0]) //interpreta 
        .map(result => result.transcript).join(""); // une las palabras y ecribe 
      
      setNote(transcript); //guarda el array listo
      mic.onerror = (event) => console.log(event.error);
    }
  };
  return (
    <>
      <div className="notes">
        <h1>Voice notes</h1>
        <div className="microphone">
          {/*este useState hace el cambio de la imagen del micro apagado a micro encendido*/}
          <IconButton onClick={()=> setIslistening((prevState=> !prevState))}>
            <img className="mic-icon" src={isListening ? micon : micoff} alt="Micro" />
          </IconButton>
        </div>
        <div className="buttons">
        {/* Botones creados con Styled components boton original AnButton y 3 customizados para los colores, 
        primero intente hacer 3 tipos de botones y hacer un extend de cada uno, ademas de ser mucho mas codigo, 
        considere los errores (pueden no exisitir) para hacer el deploy, agruegue el disabled para que bloquee los botones 
        si el micro esta encendido, y el set note para limipiar las notas*/}
        <CtButton  status = "todo" disabled={!note} onClick={() => {
           setSavedNotestodo([...savedNotestodo,note])
           setNote("")
        }}>
          To Do
        </ CtButton>
        <CtButton status = "doing" disabled={!note} onClick={() => {
           setSavedNotesdoing([...savedNotesdoing,note])
           setNote("")
        }}>
          Doing
        </CtButton >
        <CtButton status = "done" disabled={!note} onClick={() => {
           setSavedNotesdone([...savedNotesdone,note])
           setNote("")
        }}>
          Done
        </CtButton>
        </div>
        {/*typography es para darle formato a los textos del dictado, aqui es donde la api dara su info*/}
        <Typography variant="h4" component="h2" gutterBottom>
          {note} 
        </Typography>
        <DisplayNotes data={savedNotes}/>
       
      </div>
    </>
  );
}

export default App;
