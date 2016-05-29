document.addEventListener('DOMContentLoaded', function() {
//detect if cal is ON/OFF and toggle the state
var on = 0; // to detect if the calculator is on or off
var tempResult = 0; // temp variable to store results.
var temp = ""; // to store the temp number for calculation
var lastkey = ""; // last key pressed value
var lastKeyType = ""; // last key pressed class type
var display = ""; // to store the display string
var decimalPoint = false; // to detect of decimal is used or not.
var opt = "+"; // variable to store the operator 

var keypad = document.getElementById("keypad"); // creating a keypad variable

var keys = keypad.querySelectorAll("p"); // array of all keys in the keypad

for (var i = 0 ; i < keys.length ; i++)
{
  keys[i].addEventListener("click", calculate); // adding event listner for each div
}

function calculate()
  {
    var val = this.outerText;
    var type = this.className;

    switch(type){

      case "other":
  
        if(val === "ON/OFF")
        {
          if(on===0)
          {
            on = 1;
            display = " ";
            temp = 0;
          }
          else
          {
            on = 0        // when turned off, clear all the display text
            display = "";
            temp = "";
            tempResult = 0;
          }
        }
        else if (val === "CE" && on === 1)
        {
          temp = 0;
        }
        else if(val === "CLR" && on === 1) 
        {
          tempResult = 0; // temp able to store results.
          temp = 0; // to store the temp number for calculation
          lastkey = ""; // last key pressed value
          lastKeyType = ""; // last key pressed class type
          display = ""; // to store the display string
          decimalPoint = false; // to detect of decimal is used or not.
        }
        else if (val === "=" && on === 1)
        {
          display = ""
          tempResult = evaluate(opt, temp, tempResult);
          temp = tempResult;
          opt = "";
        }

        break;

      case 'number':

        if (on===1)
        {
          if(lastKeyType === "operator")
          {
            temp = 0;
            decimalPoint = false;
          }
          else if (lastKeyType=== "other")
          {
            temp =0;
            decimalPoint = false;
            opt = "+";
            tempResult = 0;
          }
          if(temp === 0 )
            temp = val;
          else
            temp = temp + val ;

          console.log(temp);
        }
        break;

      case 'operator':
      if (on===1)
      {
        if(lastKeyType==="operator")
        {
          display = display.substring(0, display.length - 2) + val + " "; //removing the last space and operator and replacing with new operator 
          opt = val;
        }
        else if (lastKeyType=== "other")
        {
          temp =tempResult;
          decimalPoint = false;
          opt = val;
          display = display + temp + " " + val + " ";
        }
        else
        {
          display = display + temp + " " + val + " ";
          tempResult = evaluate(opt, temp, tempResult);
          temp = tempResult; // operator detected so making the number value as the result of the previous exp
          opt = val;
        }
      }

      /*case 'decimal':
        if(decimalPoint === false)
        {
          temp = temp + val;
          decimalPoint = true;
        }
        break;

      default:
      break;*/

    }
    lastkey = val; // storing this val for next value
    lastKeyType = type; // storing the class of previous

    $("#displayString").empty().append(display);
    $("#result").empty().append(temp);
  } 

  function evaluate(opt, temp, tempResult)
  {
    switch(opt){

      case "+":
        tempResult += Number(temp);
        break;

      case "-":
        tempResult -= Number(temp);
        break;

      case "/":
        tempResult /= Number(temp);
        break;

      case "x":
        tempResult *= Number(temp);
        break;

      default:
        break;
    } 
    console.log(tempResult)
    return tempResult;
  }
});
