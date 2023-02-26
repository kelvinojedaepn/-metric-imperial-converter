const chai = require("chai")
let assert = chai.assert
const ConvertHandler = require("../controllers/convertHandler.js")

let convertHandler = new ConvertHandler()

suite("Unit Tests", function () {
  suite("Function convertHandler.getNum(input)", function () {
    test("Whole number input", function (done) {
      let input = "32L"
      assert.equal(convertHandler.getNum(input), 32)
      done()
    })
    test("Decimal Input", function (done) {
      let input = "32.2L"
      assert.equal(convertHandler.getNum(input), 32.2)
      done()
    })
    test("Fraction Input", function (done) {
      let input = "1/32L"
      assert.equal(convertHandler.getNum(input), 1 / 32)
      done()
    })
    test("Fraction Input w/ Decimal", function (done) {
      let input = "1.2/32L"
      assert.equal(convertHandler.getNum(input), 1.2 / 32)
      done()
    })
    test("Invalid Input (double fraction)", function (done) {
      let input = "1/2/32L"
      assert.equal(convertHandler.getNum(input), undefined)
      done()
    })
    test("No Numerical Input", function (done) {
      let input = "L"
      assert.equal(convertHandler.getNum(input), 1)
      done()
    })
  })
  suite("Function convertHandler.getUnit(input)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let input = [
        "gal",
        "l",
        "mi",
        "lbs",
        "km",
        "kg",
        "GAL",
        "L",
        "MI",
        "LBS",
        "KM",
        "KG",
      ]
      let ouput = [
        "gal",
        "L",
        "mi",
        "lbs",
        "km",
        "kg",
        "gal",
        "L",
        "mi",
        "lbs",
        "km",
        "kg",
      ]
      input.forEach(function (ele, index) {
        // console.log(index)
        assert.equal(convertHandler.getUnit(ele), ouput[index])
      })
      done()
    })
    test("Unknown Unit Input", function (done) {
      assert.equal(convertHandler.getUnit("34kilo"), undefined)
      done()
    })
  })
  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let input = ["gal", "l", "mi", "lbs", "km", "kg"]
      let ouput = ["L", "gal", "km", "kg", "mi", "lbs"]
      input.forEach(function (ele, index) {
        // console.log(index)
        assert.equal(convertHandler.getReturnUnit(ele), ouput[index])
      })
      done()
    })
  })
  suite("Function convertHandler.spellOutUnit(unit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let input = ["gal", "l", "mi", "lbs", "km", "kg"]
      let ouput = [
        "gallons",
        "liters",
        "miles",
        "pounds",
        "kilometers",
        "kilograms",
      ]
      input.forEach(function (ele, index) {
        // console.log(index)
        assert.equal(convertHandler.spellOutUnit(ele), ouput[index])
      })
      done()
    })
  })
  suite("Function convertHandler.convert(num, unit)", function () {
    test("Gal to L", function (done) {
      let input = [5, "gal"]
      let ouput = 18.9271
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        ouput,
        0.1
      )
      done()
    })
    test("L to Gal", function (done) {
      let input = [5, "L"]
      let ouput = 1.32086
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        ouput,
        0.1
      )
      done()
    })
    test("Mi to Km", function (done) {
      let input = [5, "mi"]
      let ouput = 8.0467
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        ouput,
        0.1
      )
      done()
    })
    test("Km to Mi", function (done) {
      let input = [5, "km"]
      let ouput = 3.10686
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        ouput,
        0.1
      )
      done()
    })
    test("Lbs to Kg", function (done) {
      let input = [5, "lbs"]
      let ouput = 2.26796
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        ouput,
        0.1
      )
      done()
    })
    test("Kg to Lbs", function (done) {
      let input = [5, "kg"]
      let ouput = 11.02312
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        ouput,
        0.1
      )
      done()
    })
  })
})
