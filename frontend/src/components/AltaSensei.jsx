import { Typography, TextField, Stack, Button,Checkbox,FormGroup,FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router";
// Importamos las variables de entorno
import { apiUrl } from '../config';


function AltaSensei() {
  const [checked, setChecked] = useState(true);

  const [datos, setDatos] = useState({
    nombre: "",
    fecha_nacimiento: "",
    peso: "",
    tipo: "",
    activo: true,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();

    // Enviamos los datos mediante fetch
    try{
        const response = await fetch(apiUrl + "/sensei", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
          });

        if (response.ok) {
            const respuesta = await response.json();
            alert(respuesta.mensaje);
            if(respuesta.ok){
                navigate("/"); // Volver a la página principal
            }  
        } 
    } catch (error) {
        console.error("Error:", error);
        alert("Error:", error);
    }
  };

  const handleChange = (e) => { 
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
    console.log(datos);
  };
  const handleChangeChecked = (e) => { 
    setChecked(e.target.checked);
    setDatos({
      ...datos,
      [e.target.name]: checked,
    });
    console.log(datos);
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Alta de sensei
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ mx: 2 }}
          >
            <TextField
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Fecha nacimiento"
              variant="outlined"
              name="fecha_nacimiento"
              value={datos.fecha_nacimiento}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Peso"
              variant="outlined"
              name="peso"
              value={datos.peso}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Tipo"
              variant="outlined"
              name="tipo"
              value={datos.tipo}
              onChange={handleChange}
            />
            <FormGroup>
              <FormControlLabel control={
                 <Checkbox
                  id="outlined-basic"
                  label="Activo"
                  variant="outlined"
                  name="activo"
                  checked={checked}
                  value={datos.activo}
                  onChange={handleChangeChecked}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                } label="Activo" />
            </FormGroup>
           
            <Button variant="contained" type="submit">
              Aceptar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default AltaSensei;
