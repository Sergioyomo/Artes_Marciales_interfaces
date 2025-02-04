// Importamos el modelo de tipo
const aprendizModel = require('../models/aprendizModel');

// Definimos la clase TipoService para gestionar los servicios relacionados con "tipo"
class AprendizService {

    // Método para obtener todos los tipos usando async/await
    async getAllAprendiz() {
        try {
            // Utilizamos await para esperar la respuesta del modelo
            const data = await aprendizModel.getAllAprendiz();
            
            // Devolvemos los datos obtenidos
            return data;
        } catch (err) {
            // Si ocurre un error, lo lanzamos
            throw err;
        }
    }

    async createAprendiz(aprendizData) {
            try {
                const result = await aprendizModel.createAprendiz(aprendizData);
                return result;
            } catch (err) {
                throw err;
            }
        }

    // Otros métodos del servicio podrían ser definidos aquí
    async getAprendizById(idAprendiz) {
         try {
             const result = await aprendizModel.getAprendizById(idAprendiz);
             return result;
            } catch (err) {
                throw err;
            }
      }


    async deleteAprendiz(idAprendiz) {
            try {
                const result = await aprendizModel.deleteAprendiz(idAprendiz);
                return result.affectedRows; // Number of affected rows
            } catch (err) {
                throw err;
            }
        }
    async updateAprendiz(id, datos) {
            try {
                const updated = await aprendizModel.updateAprendiz(datos,id);
                return updated;
            } catch (err) {
                throw err;
            }
        }
        
        async getAprendicesFiltrados(filtros) {
            try {
                const data = await aprendizModel.getAprendicesFiltrados({ where: filtros });
                return data;
            } catch (err) {
                throw err;
            }
        }        

}



// Exportamos una instancia única de TipoService
module.exports = new AprendizService();

