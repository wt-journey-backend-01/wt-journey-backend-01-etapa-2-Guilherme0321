"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = findAll;
exports.findById = findById;
exports.create = create;
exports.update = update;
exports.partialUpdateAgente = partialUpdateAgente;
exports.deleteAgente = deleteAgente;
const agentes = [
    {
        "id": "401bccf5-cf9e-489d-8412-446cd169a0f1",
        "nome": "Rommel Carneiro",
        "dataDeIncorporacao": new Date("1992-10-04"),
        "cargo": "delegado"
    },
    {
        "id": "a2b8e2f9-3d1a-4c6b-9b8e-3d1a4c6b9b8e",
        "nome": "Ana Oliveira",
        "dataDeIncorporacao": new Date("2015-03-12"),
        "cargo": "inspetor"
    }
];
function findAll(cargo, sort) {
    let selectedAgentes = agentes;
    if (cargo) {
        selectedAgentes = selectedAgentes.filter(agente => agente.cargo === cargo);
    }
    if (sort == 'dataDeIncorporacao') {
        selectedAgentes.sort((a, b) => a.dataDeIncorporacao.getTime() - b.dataDeIncorporacao.getTime());
    }
    else if (sort == '-dataDeIncorporacao') {
        selectedAgentes.sort((a, b) => b.dataDeIncorporacao.getTime() - a.dataDeIncorporacao.getTime());
    }
    return selectedAgentes;
}
function findById(id) {
    return agentes.find(agente => agente.id === id);
}
function create(agente) {
    agentes.push(agente);
    return agente;
}
function update(id, updatedAgente) {
    const index = agentes.findIndex(agente => agente.id === id);
    if (index !== -1) {
        agentes[index] = updatedAgente;
        return updatedAgente;
    }
    return undefined;
}
function partialUpdateAgente(id, updatedAgente) {
    const agente = findById(id);
    if (agente) {
        Object.assign(agente, updatedAgente);
        return agente;
    }
    return undefined;
}
function deleteAgente(id) {
    const index = agentes.findIndex(agente => agente.id === id);
    if (index !== -1) {
        agentes.splice(index, 1);
        return true;
    }
    return false;
}
