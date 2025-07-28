"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCasos = getAllCasos;
exports.getCasoById = getCasoById;
exports.getAgenteByCasoId = getAgenteByCasoId;
exports.searchCasos = searchCasos;
exports.createCaso = createCaso;
exports.updateCaso = updateCaso;
exports.partialUpdateCaso = partialUpdateCaso;
exports.deleteCaso = deleteCaso;
const casosRepository = __importStar(require("../repositories/casosRepository"));
const agentesRepository = __importStar(require("../repositories/agentesRepository"));
const casoSchema_1 = __importDefault(require("../schemas/casoSchema"));
function getAllCasos(req, res) {
    const { agente_id, status } = req.query;
    const casos = casosRepository.findAll(agente_id, status);
    res.json(casos);
}
function getCasoById(req, res, next) {
    try {
        const { id } = req.params;
        const caso = casosRepository.findById(id);
        if (!caso) {
            return res.status(404).json({ error: "Caso não encontrado." });
        }
        return res.json(caso);
    }
    catch (error) {
        next(error);
    }
}
function getAgenteByCasoId(req, res, next) {
    try {
        const { id } = req.params;
        const caso = casosRepository.findById(id);
        if (!caso) {
            return res.status(404).json({ error: "Caso não encontrado." });
        }
        const agente = agentesRepository.findById(caso.agente_id);
        if (!agente) {
            return res.status(404).json({ error: "Agente não encontrado." });
        }
        return res.json(agente);
    }
    catch (error) {
        next(error);
    }
}
function searchCasos(req, res, next) {
    try {
        const { q } = req.query;
        if (!q || typeof q !== 'string') {
            return res.status(400).json({ error: "Query string inválida." });
        }
        const casos = casosRepository.searchCasos(q);
        return res.json(casos);
    }
    catch (error) {
        next(error);
    }
}
function createCaso(req, res, next) {
    try {
        const validatedCase = casoSchema_1.default.parse(req.body);
        const newCase = casosRepository.create(validatedCase);
        return res.status(201).json(newCase);
    }
    catch (error) {
        next(error);
    }
}
function updateCaso(req, res, next) {
    try {
        const { id } = req.params;
        const validatedCase = casoSchema_1.default.parse(req.body);
        const updatedCase = casosRepository.update(id, validatedCase);
        if (!updatedCase) {
            return res.status(404).json({ error: "Caso não encontrado." });
        }
        return res.json(updatedCase);
    }
    catch (error) {
        next(error);
    }
}
function partialUpdateCaso(req, res, next) {
    try {
        const { id } = req.params;
        const validatedPartialCaso = casoSchema_1.default.partial().parse(req.body);
        const updatedCase = casosRepository.partialUpdateCaso(id, validatedPartialCaso);
        if (!updatedCase) {
            return res.status(404).json({ error: "Caso não encontrado." });
        }
        return res.json(updatedCase);
    }
    catch (error) {
        next(error);
    }
}
function deleteCaso(req, res, next) {
    try {
        const { id } = req.params;
        const deleted = casosRepository.deleteCaso(id);
        if (!deleted) {
            return res.status(404).json({ error: "Caso não encontrado." });
        }
        return res.status(204).send();
    }
    catch (error) {
        next(error);
    }
}
