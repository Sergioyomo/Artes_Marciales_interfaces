// Import the model layer for handling database interactions related to components
const senseiModel = require('../models/senseiModel');
const { logMensaje } = require('../utils/logger');

class SenseiService {

    // 5. Listado sin parametrizar, que mostrará todos los registros de una tabla
    async getAllSensei() {
        try {
            const data = await senseiModel.getAllSensei();
            return data;
        } catch (err) {
            throw err;
        }
    }

    // Retrieves a list of components for display purposes
    async getAllComponenteListado() {
        try {
            const data = await componenteModel.getAllComponenteListado();
            return data;
        } catch (err) {
            throw err;
        }
    }

    // 1. Alta de registros
    async createSensei(senseiData) {
        try {
            const result = await senseiModel.createSensei(senseiData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // 2. Consulta a partir de la clave primaria para buscar un registro 
    async getSenseiById(idSensei) {
        try {
            const result = await senseiModel.getSenseiById(idSensei);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // 4. Borrado a partir de la clave primaria u otro campo 
    async deleteSensei(idSensei) {
        try {
            const result = await senseiModel.deleteSensei(idSensei);
            return result.affectedRows; // Number of affected rows
        } catch (err) {
            throw err;
        }
    }

    async updateSensei(id, datos) {
        try {
            const updated = await senseiModel.updateSensei(datos,id);
            return updated;
        } catch (err) {
            throw err;
        }
    }
    
    async getSenseisFiltrados(filtros) {
        try {
            const data = await senseiModel.getSenseisFiltrados({ where: filtros });
            return data;
        } catch (err) {
            throw err;
        }
    }

    // Additional service methods can be implemented here...
}

module.exports = new SenseiService();
