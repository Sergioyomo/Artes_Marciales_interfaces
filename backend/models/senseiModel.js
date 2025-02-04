// Importamos la configuración de la base de datos y los utilitarios para loguear errores
const db = require("../config/dbConfig");
const { logErrorSQL, logMensaje } = require("../utils/logger");

class SenseiModel {
  // Método para obtener todos los sensei
  async getAllSensei() {
    const query = "SELECT * FROM Sensei";
    try {
       // Usamos await para obtener los datos de la consulta
       const [result] = await db.promise().query(query); // Usamos promise() para que query sea compatible con promesas
       return result; // Retornamos el resultado
    } catch (err) {
      // Si hay un error, lo registramos y lo lanzamos
      logErrorSQL(err);
      throw err;
    }
  }

  // Método para obtener componentes con listado adicional (join con tipo)
  async getAllComponenteListado() {
    const query =
      "SELECT c.*, t.tipo, t.descripcion as tipo_descripcion FROM componente c JOIN tipo t ON c.idtipo = t.idtipo";
    try {
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query); // Usamos promise() para que query sea compatible con promesas
      return result;
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  // Método para crear un sensei (insertar en la base de datos)
  async createSensei(senseiData) {
    const query =
      "INSERT INTO Sensei (idSensei, nombre, fecha_nacimiento, tipo, peso, activo) VALUES (?, ?, ?, ?, ?, ?)";
      //si el id es autoincremental
      //"INSERT INTO sensei (nombre, fecha_nacimiento, tipo, peso, activo) VALUES (?, ?, ?, ?, ?)";
    const values = [
      null,
      senseiData.nombre,
      senseiData.fecha_nacimiento,
      senseiData.tipo,
      senseiData.peso,
      senseiData.activo,
    ];

    try {
      // Ejecutamos la consulta con los valores proporcionados
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query, values); // Usamos promise() para que query sea compatible con promesas
      return result; // Retornamos el resultado de la inserción
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }

  // Método para obtener un sensei por su ID
  async getSenseiById(idSensei) {
    const query = "SELECT * FROM Sensei WHERE idSensei = ?";
    try {
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query, [idSensei]); // Usamos promise() para que query sea compatible con promesas
      if (result.length === 0) {
        return null; // Si no se encuentra el componente, retornamos null
      }
      return result[0]; // Devolvemos el primer componente encontrado
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }

  // Método para eliminar un sensei
  async deleteSensei(idSensei) {
    const query = "DELETE FROM Sensei WHERE idSensei = ?";
    try {
      const [result] = await db.promise().query(query, [idSensei]); // Usamos promise() para que query sea compatible con promesas
      return result; // Devolvemos el resultado de la eliminación
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  async getSenseisFiltrados(filters = {}) {
    let query = "SELECT * FROM Sensei";
    const conditions = [];
    const values = [];

    if (filters.where.tipo) {
      conditions.push("tipo = ?");
      values.push(filters.where.tipo);
    }
    if (filters.where.activo !== undefined) {
      conditions.push("activo = ?");
      values.push(filters.where.activo ? 1 : 0);
    }
    if (filters.where.nombre) {
      conditions.push("nombre LIKE ?");
      values.push(`%${filters.where.nombre}%`);
    }
    if (filters.where.peso) {
      conditions.push("peso = ?");
      values.push(filters.where.peso);
    }
    if (filters.where.fecha_nacimiento) {
      conditions.push("fecha_nacimiento = ?");
      values.push(filters.where.fecha_nacimiento);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }
    try {
      const [result] = await db.promise().query(query, values);
      return result;
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  async updateSensei(updateData, id) {
    const fields = [];
    const values = [];

    Object.keys(updateData).forEach((key) => {
      fields.push(`${key} = ?`);
      values.push(updateData[key]);
    });

    if (fields.length === 0) {
      throw new Error("No hay datos para actualizar");
    }

    values.push(id); // Agregamos el ID al final para el WHERE

    const query = `UPDATE Sensei SET ${fields.join(", ")} WHERE idSensei = ?`;
    console.log(id);
    try {
      const [result] = await db.promise().query(query, values);
      return result.affectedRows > 0;
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  // Otros métodos del modelo pueden ser añadidos aquí...
}

// Exportamos una instancia única de ComponenteModel
module.exports = new SenseiModel();
