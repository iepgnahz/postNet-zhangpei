"use strict"
let postNet = require("../translateCode")
describe("formatPosCode",function(){
  it("should return a postCode",function(){
    let input = "45056-1234"
    let result = postNet.formatPosCode(input)
    let expectResult = "450561234"
    expect(result).toEqual(expectResult)
  })
})

describe("calculateCheckCode",function(){
  it("should return a checkCode",function(){
    let postCode = "450561234"
    let result = postNet.calculateCheckCode(postCode)
    let expectResult = 0
    expect(result).toEqual(expectResult)
  })
})

describe("changeCode",function(){
  it("should return barcodes",function(){
    let checkCode = 0
    let postCode = "450561234"
    let items = [{postCode:"1",barcode:"00011"},{postCode:"2",barcode:"00101"},{postCode:"3",barcode:"00110"},{postCode:"4",barcode:"01001"},{postCode:"5",barcode:"01010"},{postCode:"6",barcode:"01100"},{postCode:"7",barcode:"10001"},
    {postCode:"8",barcode:"10010"},{postCode:"9",barcode:"10100"},{postCode:"0",barcode:"11000"}
  ]
    let result = postNet.changeCode(checkCode,postCode,items)


    let expectResult = ["01001","01010","11000","01010","01100","00011","00101","00110","01001","11000"]
    expect(result).toEqual(expectResult)
  })
})
describe("mergeCode",function(){
  it("should return a barcode",function(){
    let barcodes = ["01001","01010","11000","01010","01100","00011","00101","00110","01001","11000"]
    let result = postNet.mergeCode(barcodes)
    let expectResult = "1010010101011000010100110000011001010011001001110001"
    expect(result).toEqual(expectResult)
  })
})
describe("changePostcode",function(){
  it("shloud return a barcode",function(){
    let input = "45056-1234"

    let expectResult = "1010010101011000010100110000011001010011001001110001"
    spyOn(console,"log")
    postNet.changePostcode(input)
    expect(console.log).toHaveBeenCalledWith(expectResult)
  })
})
describe("formatBarcode",function(){
  it("should return a formatedBarcode",function(){
    let input = "1010010101011000010100110000011001010011001001110001"
    let result = postNet.formatBarcode(input)
    let expectResult = "01001010101100001010011000001100101001100100111000"
    expect(result).toEqual(expectResult)
  })
})
describe("divideBarcode",function(){
  it("should return divideBarcode",function(){
    let formatedBarcode = "01001010101100001010011000001100101001100100111000"
    let result = postNet.divideBarcode(formatedBarcode)
    let expectResult = ["01001","01010","11000","01010","01100","00011","00101","00110","01001","11000"]
    expect(result).toEqual(expectResult)
  })
})
describe("calculatePostCodeItem",function(){
  it("should return a ",function(){
    let weight = "74210"
    let barcodeItems = ["01001","01010","11000","01010","01100","00011","00101","00110","01001","11000"]
    let result = postNet.calculatePostCodeItem(weight,barcodeItems)
    let expectResult = [ 4, 5, 0, 5, 6, 1, 2, 3, 4, 0 ]
    expect(result).toEqual(expectResult)
  })
})
describe("getPostCode",function(){
  it("should return a postCode",function(){
    let postCodeItems = [ 4, 5, 0, 5, 6, 1, 2, 3, 4, 0 ]
    let expectResult = "45056-1234"
    let result = postNet.getPostCode(postCodeItems)
    expect(result).toEqual(expectResult)
  })
})
describe("changeBarcode",function(){
  it("should return postCode",function(){
    let input = "1010010101011000010100110000011001010011001001110001"

    let expectResult = "45056-1234"
    spyOn(console,"log")
    postNet.changeBarcode(input)
    expect(console.log).toHaveBeenCalledWith(expectResult)
  })
})

describe("printPostCode",function(){
  it("should print postCode",function(){
    let postCode = "45056-1234"
    spyOn(console,"log")
    postNet.printPostCode(postCode)
    expect(console.log).toHaveBeenCalledWith(postCode)
  })
})

describe("translateCode",function(){
  it("should return a postCode",function(){
    let input = "1010010101011000010100110000011001010011001001110001"
    spyOn(console,"log")
    postNet.translateCode(input)
    expect(console.log).toHaveBeenCalledWith("45056-1234")
  })
  it("should return a barcode",function(){
    let input = "45056-1234"
    spyOn(console,"log")
    postNet.translateCode(input)
    expect(console.log).toHaveBeenCalledWith("1010010101011000010100110000011001010011001001110001")
  })
  it("should stop",function(){
    let input= "stop"
    spyOn(console,"log")
    postNet.translateCode(input)
    expect(console.log).toHaveBeenCalledWith("stop")
  })
})
describe("printBarcode",function(){
  it("should print barcode",function(){
    let barcode = "1010010101011000010100110000011001010011001001110001"
    spyOn(console,"log")
    postNet.printPostCode(barcode)
    expect(console.log).toHaveBeenCalledWith(barcode)

  })
})
