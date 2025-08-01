import { NextFunction, Request, Response } from 'express';
import * as agentesRepository from "../repositories/agentesRepository";
import agenteSchema from '../schemas/agenteSchema';

export function getAllAgentes(req: Request, res: Response, next: NextFunction) {
    try {
        const { cargo, sort } = req.query;
        
        // Validar cargo se fornecido
        if (cargo && typeof cargo !== 'string') {
            return res.status(400).json({ error: "Parâmetro 'cargo' deve ser uma string." });
        }
        
        // Validar sort se fornecido
        if (sort && typeof sort !== 'string') {
            return res.status(400).json({ error: "Parâmetro 'sort' deve ser uma string." });
        }
        
        // Validar valores de sort permitidos
        if (sort && !['dataDeIncorporacao', '-dataDeIncorporacao'].includes(sort)) {
            return res.status(400).json({ 
                error: "Parâmetro 'sort' deve ser 'dataDeIncorporacao' ou '-dataDeIncorporacao'." 
            });
        }
        
        const agentes = agentesRepository.findAll(cargo as string, sort as string);
        res.json(agentes);
    } catch (error) {
        next(error);
    }
}

export function getAgenteById(req: Request, res: Response, next: NextFunction) {
    try{
        const { id } = req.params;
        const agente = agentesRepository.findById(id);
        if (!agente) {
            return res.status(404).json({ error: "Agente não encontrado." });
        }
        return res.json(agente);
    } catch (error) {
        next(error);
    }
}

export function createAgente(req: Request, res: Response, next: NextFunction) {
    try {
        const validatedAgente = agenteSchema.parse(req.body);
        const newAgente = agentesRepository.create(validatedAgente);
        return res.status(201).json(newAgente);
    } catch (error) {
        next(error);
    }
}

export function updateAgente(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const validatedAgente = agenteSchema.parse(req.body);
        const updatedAgente = agentesRepository.update(id, validatedAgente);
        if (!updatedAgente) {
            return res.status(404).json({ error: "Agente não encontrado." });
        }
        return res.json(updatedAgente);
    } catch (error) {
        next(error);
    }
}

export function partialUpdateAgente(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const validatedPartialAgente = agenteSchema.partial().parse(req.body);
        const updatedAgente = agentesRepository.partialUpdateAgente(id, validatedPartialAgente);
        if (!updatedAgente) {
            return res.status(404).json({ error: "Agente não encontrado." });
        }
        return res.json(updatedAgente);       
    } catch (error) {
        next(error);
    }
}

export function deleteAgente(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const deleted = agentesRepository.deleteAgente(id);
        if (!deleted) {
            return res.status(404).json({ error: "Agente não encontrado." });
        }
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}