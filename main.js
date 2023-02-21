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
    const propertyOne = splitRequestArr[2] || false
    const propertyTwo = splitRequestArr[3] || false

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

    if(propertyOne && !(propertyOne in availableProperties)){
      thirdParameterError = `${errorCount > 0 ? "</br></br>":""}The property [${propertyOne.toUpperCase()}] is wrong.</br>Available properties: [${Object.keys(availableProperties).map(key => key.toUpperCase()).join(", ")}]`;
      document.querySelector(".invalid-feedback").innerHTML =  firstParameterError + secondParameterError + thirdParameterError
      numberElement.classList.add("is-invalid");
      document.querySelector('.result').innerHTML = "";
      errorCount++;
    }


    if(propertyTwo && !(propertyTwo in availableProperties)){
      fourthParameterError = `${firstParameterError !== "" || secondParameterError !== "" ? "</br></br>":""}${thirdParameterError !== "" ? `The properties [${propertyOne.toUpperCase()}, ${propertyTwo.toUpperCase()}] are` : `The property [${propertyOne.toUpperCase()}] is`} wrong.</br>Available properties: [${Object.keys(availableProperties).map(key => key.toUpperCase()).join(", ")}]`;

      document.querySelector(".invalid-feedback").innerHTML =  firstParameterError + secondParameterError + fourthParameterError
      numberElement.classList.add("is-invalid");
      document.querySelector('.result').innerHTML = "";
      errorCount++;
    }

    if(propertyTwo && (splitRequestArr.includes('even') && splitRequestArr.includes('odd')) || (splitRequestArr.includes('square') && splitRequestArr.includes('sunny')) || (splitRequestArr.includes('duck') && splitRequestArr.includes('spy'))){
      document.querySelector(".invalid-feedback").innerHTML =  `${document.querySelector(".invalid-feedback").innerHTML}${errorCount > 0 ? "</br></br>" : ""}The request contains mutually exclusive properties: [${propertyOne}, ${propertyTwo}]</br>There are no numbers with these properties.`;
      numberElement.classList.add("is-invalid");
      document.querySelector('.result').innerHTML = "";
      errorCount++;
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
      document.querySelector('.result').innerHTML = getPropertiesNumbers(startingFrom, lengthOfList, propertyOne, propertyTwo);
    }
  });
})

const isEven = (number) => Number(number) % 2 === 0 ? "even" : ""
const isOdd = (number) => Number(number) % 2 !== 0 ? "odd" : ""
const isBuzz = (number) => Number(number) % 10 === 7 || number % 7 === 0 ? ", buzz" : "";
const isDuck = (number) => number.toString().slice(1).includes("0") ? ", duck" : "";
const isPalindromic= (number) => number.split("").reverse().join("") === number || Number(number) < 10 ? ", palindromic" : ""
const isGapful = (number) => !(Number(number) < 100) && (Number(number) % Number(number.toString().slice(0,1) + number.toString().slice(-1))) === 0 ? ", gapful" : ""
const isSpy = (number) => {
  sumOfAllDigits = number.toString().split('').map(Number).reduce(function (a, b) { return a + b; }, 0);
  productOfAllDigits = number.toString().split('').map(Number).reduce(function (a, b) { return a * b; }, 1);
  return sumOfAllDigits === productOfAllDigits ? ", spy" : "";
}
const isSquare = (number) => Number.isInteger(Math.sqrt(Number(number))) ? ", square" : ""
const isSunny = (number) => Number.isInteger(Math.sqrt(Number(number) + 1)) ? ", sunny" : ""

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
            <div style="margin-left:55px">even: ${Boolean(isEven(number)).toString()}</div>
            <div style="margin-left:61px">odd:  ${Boolean(isOdd(number)).toString()}</div>
          </div>
          `
}

const getPropertiesNumbers = (startingFrom, lengthOfList, propertyOne = null, propertyTwo = null) => {
  let i = 0;
  let generatedCount = 0;
  let html = "";
  let number = startingFrom;
  while(generatedCount < lengthOfList){
    if(propertyOne && propertyTwo){
      if(Boolean(availableProperties[propertyOne](number)) && Boolean(availableProperties[propertyTwo](number))){
        html += `${number} is ${isEven(number)}${isOdd(number)}${isBuzz(number)}${isDuck(number)}${isPalindromic(number)}${isGapful(number)}${isSpy(number)}${isSquare(number)}${isSunny(number)}</br>`
        generatedCount++
      }
    }else if(propertyOne){
      if(Boolean(availableProperties[propertyOne](number))){
        html += `${number} is ${isEven(number)}${isOdd(number)}${isBuzz(number)}${isDuck(number)}${isPalindromic(number)}${isGapful(number)}${isSpy(number)}${isSquare(number)}${isSunny(number)}</br>`
        generatedCount++
      }
    }else{
      html += `${number} is ${isEven(number)}${isOdd(number)}${isBuzz(number)}${isDuck(number)}${isPalindromic(number)}${isGapful(number)}${isSpy(number)}${isSquare(number)}${isSunny(number)}</br>`
      generatedCount++
    }
    i++;
    number =(Number(startingFrom) + i).toString();
  }
  return html;
}