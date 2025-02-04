import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {Box} from "@mui/material";
import { apiUrl } from '../config';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";





function ListadoAprendiz() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    async function getAprendiz() {
      let response = await fetch(apiUrl + "/aprendiz");

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getAprendiz();
  }, []); // Se ejecuta solo en el primer renderizado
  const handleDelete = async (idAprendiz) => {
    let response = await fetch(apiUrl + "/aprendiz/" + idAprendiz, {
      method: "DELETE",
    });

    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const aprendizTrasBorrado = rows.filter(
        (aprendiz) => aprendiz.idAprendiz != idAprendiz
      );
      // Establece los datos de nuevo para provocar un renderizado
      setRows(aprendizTrasBorrado);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de aprendices
      </Typography>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>idAprendiz</TableCell>
                <TableCell>nombre</TableCell>
                <TableCell>fecha_nacimiento</TableCell>
                <TableCell>cuota</TableCell>
                <TableCell>idSensei</TableCell>
                <TableCell>pagado</TableCell>
                <TableCell>ELIMINAR</TableCell>
                <TableCell>EDITAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.idAprendiz}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.idAprendiz}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.fecha_nacimiento}</TableCell>
                  <TableCell>{row.cuota}</TableCell>
                  <TableCell>{row.idSensei}</TableCell>
                  <TableCell>{row.pagado==1?"si":"no"}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(row.idAprendiz)}
                      color="error"
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/modificarAprendiz/" + row.idAprendiz)}
                    >
                      <EditNoteIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ListadoAprendiz;
