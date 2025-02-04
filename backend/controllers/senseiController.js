// Import the service layer for handling component-related operations
const senseiService = require("../services/senseiService");
const { logMensaje } = require("../utils/logger");
const Respuesta = require("../utils/respuesta");

class SenseiController {
  // Handles retrieval of all components based on query parameters
  async getAllSensei(req, res) {
    try {
      const { listado } = req.query; // Extract query parameters to determine the type of response
      if (listado) {
        // Fetch a list of components if 'listado' is true
        const filtros = req.query;
        const data = await senseiService.getSenseisFiltrados(filtros);
        res.json(Respuesta.exito(data, "Listado de Senseis filtrado"));
      }  else {
        // Fetch all components if no specific parameter is provided
        const data = await senseiService.getAllSensei();
        res.json(Respuesta.exito(data, "Datos de Sensei recuperados"));
      }
    } catch (err) {
      // Handle errors during the service call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos: ${req.originalUrl}`
          )
        );
    }
  }

async updateSensei(req, res) {
    try {
        const { id } = req.params;
        const { nombre, fecha_nacimiento, tipo, peso, activo } = req.body;
        const data = await senseiService.updateSensei(id, { nombre, fecha_nacimiento, tipo, peso, activo });
        res.json(Respuesta.exito(data, "Sensei actualizado correctamente"));
    } catch (err) {
        res.status(500).json(Respuesta.error(null, `Error al actualizar el Sensei: ${req.originalUrl}`));
    }
  }

  // Handles retrieval of a single sensei by its ID
  async getSenseiById(req, res) {
    try {
      const idSensei = req.params.id; // Extract component ID from the request URL

      // Fetch only the sensei without related data
      const sensei = await senseiService.getSenseiById(
        idSensei
      );
      if (!sensei) {
        // Handle case where the component is not found
        res
          .status(404)
          .json(
            Respuesta.error(null, `Sensei no encontrado: ${idSensei}`)
          );
      } else {
        res.json(Respuesta.exito(sensei, "Sensei recuperado"));
      }
      
    } catch (err) {
      // Handle errors during the service call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  // Handles creation of a new sensei
  async createSensei(req, res) {
    try {
      const senseiData = req.body; // Extract the component data from the request body
      const result = await senseiService.createSensei(senseiData); // Call service to create the sensei
      res
        .status(201)
        .json(
          Respuesta.exito(
            { insertId: result.insertId },
            "Sensei dado de alta"
          )
        );
    } catch (err) {
      // Handle errors during the creation process
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al insertar el sensei: ${req.originalUrl}`
          )
        );
    }
  }

  // Handles updating of a component by its ID (implementation pending)
  async updateComponente(req, res) {
    // Implementa la lógica para actualizar un dato por ID (pendiente de implementar)
  }

  // Handles deletion of a sensei by its ID
  async deleteSensei(req, res) {
    try {
      const idSensei = req.params.id; // Extract component ID from the request URL
      await senseiService.deleteSensei(idSensei); // Call service to delete the component
      res.status(204).end(); // 204: No Content indicates successful deletion with no response body
    } catch (err) {
      // Handle errors during the deletion process
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = new SenseiController();
