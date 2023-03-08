document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("submitBtn").addEventListener("click", function() {
    let errorCount = 0;
    let firstParameterError = "";
    let secondParameterError = "";
    let thirdParameterError = "";
    let fourthParameterError = "";

    const numberElement = document.getElementById('amazingNumbers');
    const request = document.getElementById('amazingNumbers').value;
    const splitRequestArr = request.split(" ");
    const startingFrom = splitRequestArr[0]
    const lengthOfList = splitRequestArr[1] || false

    const properties = splitRequestArr.slice(2) || false

    if(request === ""){
      document.querySelector(".invalid-feedback").innerHTML = "Please enter a request."
      numberElement.classList.add("is-invalid");
      document.querySelector('.result').innerHTML = "";
      return false;
    }

    if(Number(startingFrom) === 0){
      document.querySelector('.result').innerHTML = "Goodbye!"
      return false;
    }

    if(Number(startingFrom) < 0 || isNaN(startingFrom)){
      firstParameterError = `The first parameter should be a natural number or zero`;
      document.querySelector(".invalid-feedback").innerHTML = firstParameterError
      numberElement.classList.add("is-invalid");
      document.querySelector('.result').innerHTML = "";
      errorCount++;
    }


    if(lengthOfList && Number(lengthOfList) < 1 || isNaN(lengthOfList)){
      secondParameterError = `${errorCount > 0 ? "</br></br>":""}The second parameter should be a natural number.`;
      document.querySelector(".invalid-feedback").innerHTML =  firstParameterError + secondParameterError
      numberElement.classList.add("is-invalid");
      document.querySelector('.result').innerHTML = "";
      errorCount++;
    }

    let wrongArray = [];
    if(properties){
      properties.forEach(p => {
        let checkNegative = p.includes("-");
        let availableProperty = checkNegative ? p.slice(1): p
        if(!(availableProperty in availableProperties)){
          wrongArray.push(p)
        }
      })

      if(wrongArray.length > 0){
        thirdParameterError = `${errorCount > 0 ? "</br></br>":""}${wrongArray.length > 1 ? `The properties [${wrongArray.join(", ").toUpperCase()}] are` : `The property ${wrongArray[0].toUpperCase()}` } wrong.</br>Available properties: [${Object.keys(availableProperties).map(key => key.toUpperCase()).join(", ")}]`;
        document.querySelector(".invalid-feedback").innerHTML =  firstParameterError + secondParameterError + thirdParameterError
        numberElement.classList.add("is-invalid");
        document.querySelector('.result').innerHTML = "";
        errorCount++;
      }
    }

    const errorProperties = {
      even: "-even,odd",
      '-even': "-odd,even",
      odd: "-odd,even",
      '-odd': "-even,odd",
      square: "-square,sunny",
      '-square': "-sunny,square",
      sunny: "-sunny,square",
      '-sunny': "-square,sunny",
      duck: "-duck,spy",
      '-duck': "-spy,duck",
      spy: "-spy,duck",
      '-spy': "-duck,spy",
      happy: "-happy, sad", 
      '-happy': "-sad, happy", 
      sad: "-sad,happy",
      '-sad': "-happy,sad",
    }

    let foundErrorString = "";
    let index = 0;
    if(properties){
      while(foundErrorString === "" && index < properties.length){
        if(properties[index] in errorProperties){
          let propertyImpossible = errorProperties[properties[index]].split(',')
      
          if(properties.includes(propertyImpossible[0])){
            foundErrorString = `${properties[index]}, ${propertyImpossible[0]}`
          }
          if(properties.includes(propertyImpossible[1])){
            foundErrorString = `${properties[index]}, ${propertyImpossible[1]}`
          }
        }
        index++;
      }

      if(foundErrorString !== ""){
        document.querySelector(".invalid-feedback").innerHTML =  `${document.querySelector(".invalid-feedback").innerHTML}${errorCount > 0 ? "</br></br>" : ""}The request contains mutually exclusive properties: [${foundErrorString.toUpperCase()}]</br>There are no numbers with these properties.`;
        numberElement.classList.add("is-invalid");
        document.querySelector('.result').innerHTML = "";
        errorCount++;
      }
    }

    if(lengthOfList === false){
      if(errorCount === 0){
        document.querySelector('.result').innerHTML = getPropertiesOneNumber(startingFrom);
      }
    }

    if(numberElement.classList.contains("is-invalid") && errorCount === 0){
      document.querySelector(".invalid-feedback").innerHTML = ""
      numberElement.classList.remove("is-invalid");
    }

    if(lengthOfList && errorCount === 0){
      document.querySelector('.result').innerHTML = getPropertiesNumbers(startingFrom, lengthOfList, properties);
    }
  });
})

const isEven = (number) => Number(number) % 2 === 0 ? "even" : "";

const isOdd = (number) => Number(number) % 2 !== 0 ? "odd" : "";

const isBuzz = (number) => Number(number) % 10 === 7 || number % 7 === 0 ? ", buzz" : "";

const isDuck = (number) => number.toString().slice(1).includes("0") ? ", duck" : "";

const isPalindromic= (number) => number.split("").reverse().join("") === number || Number(number) < 10 ? ", palindromic" : ""

const isGapful = (number) => !(Number(number) < 100) && (Number(number) % Number(number.toString().slice(0,1) + number.toString().slice(-1))) === 0 ? ", gapful" : ""

const isSpy = (number) => {
  sumOfAllDigits = number.toString().split('').map(Number).reduce(function (total, currentValue) { return total + currentValue; }, 0);
  productOfAllDigits = number.toString().split('').map(Number).reduce(function (total, currentValue) { return total * currentValue; }, 1);
  return sumOfAllDigits === productOfAllDigits ? ", spy" : "";
}

const isSquare = (number) => Number.isInteger(Math.sqrt(Number(number))) ? ", square" : ""

const isSunny = (number) => Number.isInteger(Math.sqrt(Number(number) + 1)) ? ", sunny" : ""

const isJumping = (number) => {
  let numberArr = number.toString().split('');
  if(numberArr.length === 1) return ", jumping";
  for(let i=1;i<numberArr.length;i++){
     if(Math.abs(numberArr[i]-numberArr[i-1]) !== 1){
        return "";
     }
  }
  return ", jumping";
}

const isHappy = (number) => {
  let isHappy = number;
  let totalArray = [];
  while(isHappy !== 1 && isHappy !== 0){
    if(totalArray.includes(Number(isHappy))) return "";
    totalArray.push(Number(isHappy));
    isHappy = isHappy.toString().split("").map(Number).reduce(function (total, currentValue) { return total + Math.pow(currentValue,2); }, 0);
  }
  return isHappy === 1 ? ", happy" : "";
}

const isSad = (number) => {
  let isSad = number;
  let totalArray = [];
  while(isSad !== 1 && isSad !== 0){
    if(totalArray.includes(Number(isSad))) return ", sad";
    totalArray.push(Number(isSad));
    isSad = isSad.toString().split("").map(Number).reduce(function (total, currentValue) { return total + Math.pow(currentValue,2); }, 0);
  }
  return isSad === 0 ? ", sad" : "";
}

const availableProperties = {
  even: isEven,
  odd: isOdd,
  buzz: isBuzz,
  duck: isDuck, 
  palindromic: isPalindromic, 
  gapful: isGapful, 
  spy:isSpy,
  sunny: isSunny,
  square: isSquare,
  jumping: isJumping,
  happy: isHappy,
  sad: isSad,
}


const getPropertiesOneNumber = (number) => {
  return `Properties of ${number}</br>
          <div style="margin-left:30px">
            <div style="margin-left:54px">buzz: ${Boolean(isBuzz(number)).toString()}</div>
            <div style="margin-left:54px">duck: ${Boolean(isDuck(number)).toString()}</div>
            <div style="margin-left:6px">palindromic: ${Boolean(isPalindromic(number)).toString()}</div>
            <div style="margin-left:45px">gapful: ${Boolean(isGapful(number)).toString()}</div>
            <div style="margin-left:62px">spy: ${Boolean(isSpy(number)).toString()}</div>
            <div style="margin-left:39px">square: ${Boolean(isSquare(number)).toString()}</div>
            <div style="margin-left:46px">sunny: ${Boolean(isSunny(number)).toString()}</div>
            <div style="margin-left:46px">jumping: ${Boolean(isJumping(number)).toString()}</div>
            <div style="margin-left:46px">happy: ${Boolean(isHappy(number)).toString()}</div>
            <div style="margin-left:46px">sad: ${Boolean(isSad(number)).toString()}</div>
            <div style="margin-left:55px">even: ${Boolean(isEven(number)).toString()}</div>
            <div style="margin-left:61px">odd:  ${Boolean(isOdd(number)).toString()}</div>
          </div>
          `
}

const getPropertiesNumbers = (startingFrom, lengthOfList, properties = []) => {
  let i = 0;
  let generatedCount = 0;
  let html = "";
  let number = startingFrom;
  while(generatedCount < lengthOfList){
    if(properties){
      let checkGenerated = true;
      properties.forEach(p => {
        let property = p;
        if(property.includes("-")){
          property = property.slice(1);
          if(Boolean(availableProperties[property](number))){
            checkGenerated = false;
          }
        }else{
          if(!Boolean(availableProperties[property](number))){
            checkGenerated = false;
          }
        }
      })

      if(checkGenerated){
        html += `${number} is ${isEven(number)}${isOdd(number)}${isBuzz(number)}${isDuck(number)}${isPalindromic(number)}${isGapful(number)}${isSpy(number)}${isSquare(number)}${isSunny(number)}${isJumping(number)}${isHappy(number)}${isSad(number)}</br>`
        generatedCount++
      }
    }
    i++;
    number =(Number(startingFrom) + i).toString();
  }
  return html;
}