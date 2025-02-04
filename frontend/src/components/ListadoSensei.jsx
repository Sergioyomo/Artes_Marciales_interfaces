import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";

function ListadoSensei() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getSensei() {
      let response = await fetch(apiUrl + "/sensei");

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getSensei();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleDelete = async (idSensei) => {
    let response = await fetch(apiUrl + "/sensei/" + idSensei, {
      method: "DELETE",
    });

    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const senseiTrasBorrado = rows.filter(
        (sensei) => sensei.idSensei != idSensei
      );
      // Establece los datos de nuevo para provocar un renderizado
      setRows(senseiTrasBorrado);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de sensei
      </Typography>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">IDSENSEI</TableCell>
                <TableCell>NOMBRE</TableCell>
                <TableCell>FECHA NACIMIENTO</TableCell>
                <TableCell>TIPO</TableCell>
                <TableCell>PESO</TableCell>
                <TableCell>ACTIVO</TableCell>
                <TableCell>ELIMINAR</TableCell>
                <TableCell>EDITAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.idSensei}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.idSensei}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.fecha_nacimiento}</TableCell>
                  <TableCell>{row.tipo}</TableCell>
                  <TableCell>{row.peso}</TableCell>
                  <TableCell>{row.activo?"Si":"No"}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(row.idSensei)}
                      color="error"
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/modificarsensei/" + row.idSensei)}
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

export default ListadoSensei;
