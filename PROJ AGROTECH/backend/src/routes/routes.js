const express = require('express')
const router = express.Router()

const Usuario = require('../controller/usuario.js')
const Motorista = require('../controller/motorista.js')
const Veiculo = require('../controller/veiculo.js')
const Manutencao = require('../controller/manutencao.js')
const Alocacao = require('../controller/alocacao.js')

router.get('/motorista', Motorista.read);
router.get('/veiculo', Veiculo.read);
router.get('/alocacao', Alocacao.read);
router.get('/manutencao', Manutencao.read);
router.get('/usuario', Usuario.read);

router.post('/motorista', Motorista.create)
router.post('/manutencao', Manutencao.create)
router.post('/veiculo', Veiculo.create)
router.post('/alocacao', Alocacao.create)
router.post('/usuario', Usuario.create)

router.delete('/motorista', Motorista.remove)
router.delete('/manutencao', Manutencao.remove)
router.delete('/veiculo', Veiculo.remove)
router.delete('/alocacao', Alocacao.remove)
router.delete('/usuario', Usuario.remove)

router.put('/motorista', Motorista.update)
router.put('/manutencao', Manutencao.update)
router.put('/veiculo', Veiculo.update)
router.put('/alocacao', Alocacao.update)
router.put('/alocacao/desc', Alocacao.updateDesc)
router.put('/usuario', Usuario.update)

module.exports = router;