// Assignment Code
var generateBtn = document.querySelector("#generate");
var retryBtn = document.getElementById("rerun");
retryBtn.style.display = 'none';
//first time through writePassword function
var first = 1;
var pwdLength = 0;
var pwdTypeArr = [];
var minWidth = 8;
var maxWidth = 128;
//what is allowed
var arrCharTypes = ["lowercase", "uppercase", "numeric", "specials"];

// Write password to the #password input
function writePassword() 
{
  // make sure retry button is display:none
  !first ? toggleRetryBtn () : first=0

  pwdLength = 0;
  pwdTypeArr = [];

  pwdLength = promptLen();
  pwdTypeArr = pw_charTypes();

  var passwordText = document.querySelector("#password");
  //broke derivePwd out into separate function so I could reuse it as part of a retry button
  password.value = (derivePwd (pwdLength, pwdTypeArr));
  toggleRetryBtn ();
}

function derivePwd (pwdLength, pwdTypeArr)
{
  //counters to track which type of character was used
  var nums = 0;
  var lower = 0;
  var upper = 0;
  var specs = 0;
  
  var password = "";

  for (var i=0; i< pwdLength; i++)
  {
    switch (pwdTypeArr[(Math.floor(Math.random()*(pwdTypeArr.length-1)))])
    {
      case "uppercase":
          password += randomLetter();
          nums++;
        break;
      case "lowercase":
          password += randomLetter();
          lower++;
        break;
      case "numeric":
          password += randomNumber();
          upper++;
        break;
      case "specials":
          password += specialChar(); 
          specs++;
        break;
    }
  }
  return(password);
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
retryBtn.addEventListener("click", derivePwdProto);
                                   
function derivePwdProto()
{
  var passwordText = document.querySelector("#password");
  password.value = (derivePwd(pwdLength, pwdTypeArr));
}

function promptLen ()
{
  var funcLength = parseInt(prompt ("How many characters do you want in your password?", "Answer between 8 and 128"));

  if (!(funcLength >= minWidth && funcLength <= maxWidth))
  {
    alert ("Sorry, you did not select a number between 8 and 128, inclusive");
    promptLen();
  }
  return(funcLength);
}

function pw_charTypes ()
{
  //array to capture incorrectly typed options
  var wrongTypes = [];
  var wrongStr = "";
  //valid assists in tracking if an invalid option was typed in by the user
  var valid = 1;
  //init counter variables
  var i = 0;
  var j = 0;
  
  // prompt user for what to include in generated password
  var charType = prompt ("Which character types do you want included in your password? Answer all that apply: 'Lowercase', 'Uppercase', 'Numeric' and/or 'Specials' (for Special Characters).  Enter below with spaces in between and no ' or \" marks", "");
  //split the response string(charType) into an array of strings
  
  //This simply checks for a blank or a non-response.
  if (charType.toLowerCase() == "" || charType.trim() == " Enter here with spaces in between and no ', \" or commas.")
  {
    alert("  You must enter at least one criteria.")
    pw_charTypes();
  }
  
  var responseArr = charType.split(" ");
  var lowerRespArr = responseArr.map(responseArr => responseArr.toLowerCase());
  
  //verify each response is valid, if it is not then capture in wrongTypes
  for (i=0; i<lowerRespArr.length; i++)
  {
    if (!(arrCharTypes.includes(lowerRespArr[i])))
    {
      //stores invalid responses into an array for error message
      wrongTypes[j] = lowerRespArr[i];
      j++;
      //establishes that there is at least 1 invalid response entered
      valid = 0;
    } 
  }

  if (!valid) 
  {
    //Re-initialize pw_charTypes arrays/strings
    wrongTypes = [];
    responseArr = [];
    charType = "";
    //user must re-enter their options.
    pw_charTypes();
  }
  return(responseArr.map(responseArr => responseArr.toLowerCase()));
}

//a-z are js keycodes 65-90.  By taking a random number 
//between 0 and 25 then adding 65 to it, I will get a 
//keycode of 65-90 then in the calling function convert 
//the keycode to a randomly generated letter.  Uppercase
//letters will take the same flow however they will be made
//uppercase.
function randomNumber()
{
  return(String.fromCharCode(Math.floor(Math.random()*10)+48));
}

//Gives a random letter ... upper and lower determined later
function randomLetter()
{
  return(String.fromCharCode(Math.floor(Math.random()*26)+65));
}

//Special Characters are not listed in numerical order within the list of 
//keycodes, so we cannot use the same approach.  We must create an array of
//the allowed special characters.
function specialChar()
{
  const validSpecialChars = ["!","\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~", "]"];
  return(validSpecialChars[(Math.floor(Math.random()*validSpecialChars.length))]);
}

function toggleRetryBtn ()
{
  if (retryBtn.style.display === 'none') 
  {
    retryBtn.style.display = 'inline-block';
  } 
  else 
  {
    retryBtn.style.display = 'none';
  }
  alert ("'" +retryBtn.style.display + "'");
}