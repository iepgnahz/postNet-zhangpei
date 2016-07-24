"use strict"
function translateCode(input){
  let code = ""
  console.log(input.length)
  if(input.length>=12){
     changeBarcode(input)
  }
  if(input.length==5||input.length==9||input.length==10){
     changePostcode(input)
  }
  if(input === "stop"){
    console.log("stop")
  }
}

function formatPosCode(input){
  let postCode = ""
  for(let i=0;i<input.length;i++){
    if(input.charAt(i)!== "-"){
      postCode += input[i]
    }
  }
  return postCode
}
function calculateCheckCode(postCode){
  let checkCode = 0
  let sum = 0
  for(let i=0;i<postCode.length;i++){
    sum += Number(postCode.charAt(i))
  }
  checkCode = 10 - sum%10
  if(checkCode === 10 ){
    checkCode = 0
  }
  return checkCode
}
function loadTranslatedMethod(){
  return [{postCode:"1",barcode:"00011"},{postCode:"2",barcode:"00101"},{postCode:"3",barcode:"00110"},{postCode:"4",barcode:"01001"},{postCode:"5",barcode:"01010"},{postCode:"6",barcode:"01100"},{postCode:"7",barcode:"10001"},
  {postCode:"8",barcode:"10010"},{postCode:"9",barcode:"10100"},{postCode:"0",barcode:"11000"}
]
}
function changeCode(postCode,checkCode,items){
  let barcodes = []
  let mergedPostCode = checkCode + postCode

  for(let i=0;i<mergedPostCode.length;i++){
    let existItem = items.find((item)=>{
       return item.postCode === mergedPostCode.charAt(i)
    })
    barcodes.push(existItem.barcode)
  }
  return barcodes
}

function mergeCode(barcodes){
  let str =  barcodes.reduce((a,b)=>{
    return a+b
  },"1")
  return str + "1"
}

function printBarcode(barcode){
  console.log(barcode)
}

function changePostcode(input){
  let postCode = formatPosCode(input)
  let checkCode = calculateCheckCode(postCode)
  let items = loadTranslatedMethod()
  let barcodes = changeCode(checkCode,postCode,items)
  let barcode = mergeCode(barcodes)
  printBarcode(barcode)
}

function formatBarcode(input){
  return input.substring(1,input.length-1)
}

function divideBarcode(formatedBarcode){
  let barcodeItems = []
  for(let i=0;i<formatedBarcode.length;i+=5){
    let str = ""
    for(let j=0;j<5;j++){
      str += formatedBarcode[i+j]
    }
    barcodeItems.push(str)
  }
  return barcodeItems
}
function loadWeight(){
  return "74210"
}
function calculatePostCodeItem(weight,barcodeItems){
  return  barcodeItems.map((item)=>{
    let sum = 0
    for(let i=0;i<weight.length;i++){
      sum += Number(item.charAt(i)) * Number(weight.charAt(i))
    }
    if(sum===11){
      sum = 0
    }
    return sum
  })
}

function getPostCode(postCodeItems){
  postCodeItems.length = postCodeItems.length-1
  let postCode = ""
  postCode =  postCodeItems.reduce((a,b)=>{
    return a.toString() + b.toString()
  },"")
  if(postCode.length === 9){
    let str1 = postCode.substring(0,5)
    let str2 = postCode.substring(5,postCode.length)
    postCode = str1 + "-" + str2
  }
  return postCode
}

function printPostCode(postCode){
  console.log(postCode)
}

function changeBarcode(input){
  let formatedBarcode = formatBarcode(input)
  let barcodeItems = divideBarcode(formatedBarcode)
  let weight = loadWeight()
  let postCodeItems = calculatePostCodeItem(weight,barcodeItems)
  let postCode = getPostCode(postCodeItems)
  printPostCode(postCode)
}









exports.formatPosCode = formatPosCode
exports.calculateCheckCode = calculateCheckCode
exports.changeCode = changeCode
exports.mergeCode = mergeCode
exports.changePostcode = changePostcode
exports.formatBarcode = formatBarcode
exports.divideBarcode = divideBarcode
exports.calculatePostCodeItem = calculatePostCodeItem
exports.getPostCode = getPostCode
exports.changeBarcode = changeBarcode
exports.printPostCode = printPostCode
exports.printBarcode = printBarcode
exports.translateCode = translateCode
