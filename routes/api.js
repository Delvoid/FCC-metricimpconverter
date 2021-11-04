'use strict'

const expect = require('chai').expect
const ConvertHandler = require('../controllers/convertHandler.js')

module.exports = function (app) {
  let convertHandler = new ConvertHandler()

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input
    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)

    if (!initNum && !initUnit) res.json('invalid number and unit')
    if (!initNum) res.json('invalid number')
    if (!initUnit) res.json('invalid unit')

    const returnNum = convertHandler.convert(initNum, initUnit)
    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

    res.json({ initNum, initUnit, returnNum, returnUnit, string: toString })
  })
}
