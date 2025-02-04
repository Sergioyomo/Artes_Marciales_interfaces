import { Typography, TextField, Stack, Button,Checkbox,FormGroup,FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";

function ModificarAprendiz() {
  const params = useParams();
  let [checked, setChecked] = useState(true);
  let [datos, setDatos] = useState({
    idAprendiz: params.idAprendiz,
    nombre: "",
    fecha_nacimiento: "",
    cuota: "",
    idSensei:"",
    pagado: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function getAprendizById() {
      let response = await fetch(apiUrl + "/aprendiz/" + datos.idAprendiz);
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
        checked = data.datos.pagado;
        setChecked(checked);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta erronea
      }
    }

    getAprendizById();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();
      // Enviamos los datos mediante fetch
      try {
        console.log("Vamos a hacer fetch");
        console.log(datos);
        const response = await fetch(apiUrl + "/aprendiz/" + datos.idAprendiz, {
          method: "PUT", // "PATCH"
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos), // JSON.stringify({blocked: true})
        });

        if (response.ok) {
          // 204 No content
          alert("Actualización correcta");
          navigate(-1); // Volver a la ruta anterior
        } else {
          // 404 Not Found plato no modificado o no encontrado
          const data = await response.json();
          alert(data.mensaje);
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
  };
  const handleChangeChecked = (e) => { 
    checked = e.target.checked;
    setChecked(checked);
    setDatos({
      ...datos,
      [e.target.name]: checked,
    });
    console.log(datos);
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Modificar aprendiz
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
              label="cuota"
              variant="outlined"
              name="cuota"
              value={datos.cuota}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="idSensei"
              variant="outlined"
              name="idSensei"
              value={datos.idSensei}
              onChange={handleChange}
            />
            <FormGroup>
              <FormControlLabel control={
                  <Checkbox
                  id="outlined-basic"
                  label="pagado"
                  variant="outlined"
                  name="pagado"
                  checked={checked}
                  value={datos.pagado}
                  onChange={handleChangeChecked}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                } label="Pagado" />
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

export default ModificarAprendiz;
