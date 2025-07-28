"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = findAll;
exports.findById = findById;
exports.searchCasos = searchCasos;
exports.create = create;
exports.update = update;
exports.partialUpdateCaso = partialUpdateCaso;
exports.deleteCaso = deleteCaso;
const casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
    },
    {
        id: "c1a9b8e7-6d5c-4f3b-8a19-1e2d3c4a5b6f",
        titulo: "roubo de veículo",
        descricao: "Um carro foi roubado no estacionamento do shopping às 15:00 do dia 05/01/2023.",
        status: "solucionado",
        agente_id: "a2b8e2f9-3d1a-4c6b-9b8e-f1d2c3a4b5e6"
    }
];
function findAll(agente_id, status) {
    let selectedCasos = casos;
    if (agente_id) {
        selectedCasos = selectedCasos.filter(caso => caso.agente_id === agente_id);
    }
    if (status) {
        selectedCasos = selectedCasos.filter(caso => caso.status === status);
    }
    return selectedCasos;
}
function findById(id) {
    return casos.find(caso => caso.id === id);
}
function searchCasos(query) {
    return casos.filter(caso => {
        return caso.titulo.toLowerCase().includes(query.toLowerCase()) ||
            caso.descricao.toLowerCase().includes(query.toLowerCase());
    });
}
function create(caso) {
    casos.push(caso);
    return caso;
}
function update(id, updatedCaso) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index !== -1) {
        casos[index] = updatedCaso;
        return updatedCaso;
    }
    return undefined;
}
function partialUpdateCaso(id, updatedCaso) {
    const caso = findById(id);
    if (caso) {
        Object.assign(caso, updatedCaso);
        return caso;
    }
    return undefined;
}
function deleteCaso(id) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index !== -1) {
        casos.splice(index, 1);
        return true;
    }
    return false;
}
