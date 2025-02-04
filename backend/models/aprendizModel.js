// Importamos la configuración de la base de datos y el utilitario para loguear errores
const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');

class AprendizModel {

    // Método para obtener todos los tipos
    async getAllAprendiz() {
        const query = 'SELECT * FROM Aprendiz';
        try {
            // Usamos await para esperar la respuesta de la consulta
            const [result] = await db.promise().query(query); // Usamos promise() para que query sea compatible con promesas
            return result; // Retornamos el resultado de la consulta
        } catch (err) {
            // Si ocurre un error, lo registramos y lo lanzamos
            logErrorSQL(err);
            throw err;
        }
    }

    async createAprendiz(aprendizData) {
        const query =
          "INSERT INTO Aprendiz (idAprendiz, nombre, fecha_nacimiento, cuota, pagado, idSensei) VALUES (?, ?, ?, ?, ?, ?)";
          //si el id es autoincremental
          //"INSERT INTO sensei (nombre, fecha_nacimiento, tipo, peso, activo) VALUES (?, ?, ?, ?, ?)";
        const values = [
          null,
          aprendizData.nombre,
          aprendizData.fecha_nacimiento,
          aprendizData.cuota,
          aprendizData.pagado,
          aprendizData.idSensei,
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

    async getAprendizById(idAprendiz) {
        const query = "SELECT * FROM Aprendiz WHERE idAprendiz = ?";
        try {
          // Usamos await para obtener los datos de la consulta
          const [result] = await db.promise().query(query, [idAprendiz]); // Usamos promise() para que query sea compatible con promesas
          if (result.length === 0) {
            return null; // Si no se encuentra el componente, retornamos null
          }
          return result[0]; // Devolvemos el primer componente encontrado
        } catch (err) {
          logErrorSQL(err);
          throw err; // Si hay un error, lo lanzamos
        }
      }


    // Otros métodos del modelo pueden ser añadidos aquí...
    async deleteAprendiz(idAprendiz) {
        const query = "DELETE FROM Aprendiz WHERE idAprendiz = ?";
        try {
          const [result] = await db.promise().query(query, [idAprendiz]); // Usamos promise() para que query sea compatible con promesas
          return result; // Devolvemos el resultado de la eliminación
        } catch (err) {
          logErrorSQL(err);
          throw err;
        }
      }
      async getAprendicesFiltrados(filters = {}) {
        let query = "SELECT * FROM Aprendiz";
        const conditions = [];
        const values = [];
    
        if (filters.where.idSensei) {
          conditions.push("idSensei = ?");
          values.push(filters.where.idSensei);
        }
        if (filters.where.pagado !== undefined) {
          conditions.push("pagado = ?");
          values.push(filters.where.pagado ? 1 : 0);
        }
        if (filters.where.nombre) {
          conditions.push("nombre LIKE ?");
          values.push(`%${filters.where.nombre}%`);
        }
        if (filters.where.cuota) {
          conditions.push("cuota = ?");
          values.push(filters.where.cuota);
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
    
      async updateAprendiz(updateData, id) {
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
    
        const query = `UPDATE Aprendiz SET ${fields.join(", ")} WHERE idAprendiz = ?`;
        console.log(id);
        try {
          const [result] = await db.promise().query(query, values);
          return result.affectedRows > 0;
        } catch (err) {
          logErrorSQL(err);
          throw err;
        }
      }
}

// Exportamos una instancia única de TipoModel
module.exports = new AprendizModel();
