/* QUESTION OBJECTS */
var questions = [
{
  "question": "The next Playstation platform will be:",
  "allAnswers": ["PS5", "PS4K", "PSX", "PS8K"],
  "correctAnswer": "PS4K"
},
{
  "question": "The Sloth's scientific name, Bradypus, is Greek for:",
  "allAnswers": ["Moving slowly", "Swiftly", "Slow feet", "Sleeping"],
  "correctAnswer": "Slow feet"
},
{
  "question": "Earth is how far away from the Sun:",
  "allAnswers": ["92.96 Million Miles", "82.96 Million Miles", "102.96 Million Miles", "72.96 Million Miles"],
  "correctAnswer": "92.96 Million Miles"
},
{
  "question": "The first issue of National Geographic was issued in:",
  "allAnswers": ["1901", "1874", "1888", "1926"],
  "correctAnswer": "1888"
},
{
  "question": "It is approximitely how hot on the planet Venus:",
  "allAnswers": ["262 Degrees C", "162 Degrees C", "462 Degrees C", "862 Degrees C"],
  "correctAnswer": "462 Degrees C"
},
{
  "question": "What type of star is the Sun:",
  "allAnswers": ["White Dwarf", "Yellow Dwarf", "The sun is NOT a star", "Orange Dwarf"],
  "correctAnswer": "Yellow Dwarf"
},
{
  "question": "Approximitely how much of the ocean has been explored:",
  "allAnswers": ["12%", "23%", "38%", "5%"],
  "correctAnswer": "5%"
},
{
  "question": "Approximitely how long did it take for the Apollo missions to reach the moon:",
  "allAnswers": ["36 hours", "24 hours", "72 hours", "96 hours"],
  "correctAnswer": "72 hours"
},
{
  "question": "The world record for most spoons balanced on the face is:",
  "allAnswers": ["45 spoons", "62 spoons", "31 spoons", "91 spoons"],
  "correctAnswer": "31 spoons"
},
{
  "question": "The world record for most socks put on one foot in one minute is:",
  "allAnswers": ["12 socks", "28 socks", "48 socks", "67 socks"],
  "correctAnswer": "48 socks"
}];

/* DECLARATION OF MY HTML-SECTIONS VARIABLES */
var content = document.getElementById("content");
var questionHolder = document.getElementById("question");
var choicesHolder = document.getElementById("choices");
var scoreHolder = document.getElementById("score");
var timeHolder = document.getElementById("output-timer");
var submitButton = document.getElementById("submit");

/* DECLARATION OF GLOBAL VARIABLES */
var questionTracker = 0;
var score = 0;
var wasQuestionAsked = true;
var intTimer = 20;
var tempTime;

/* TIMER FUNCTION */ 
function updateTimer(intTimer) 
{
    // timer has expired.
    if (intTimer == 0)
    {
        document.getElementById('output-timer').innerHTML = "Time. Is. Up...";
        return;
    }

    tempTime = setTimeout(function() {
        // Decrease timer...
        intTimer--;

        // Update the output...
        document.getElementById('output-timer').innerHTML = "Time: " + intTimer.toString() + " seconds left.";

        // Next.
        updateTimer(intTimer);
    }, 1000);
    return tempTime;
}

// Initialise the timer ad begin timing!
function initTimer(intTimer) 
{
    clearTimeout(tempTime);
    document.getElementById("output-timer").innerHTML = "Time: " + intTimer.toString() + " seconds left.";
    updateTimer(intTimer);
}

/* FUNCTION THAT ASKS QUESTION */
function askQ()
{
  var choices = questions[questionTracker].allAnswers;
  var tempChoices = "";

  /* LOADS UP CHOICES CORRECT CHOICES CORRESPONSING TO THE QUESTION SHOWN */
  for(var i = 0; i < choices.length; i++)
  {
    tempChoices += "<input type='radio' name='quiz" + questionTracker + "' id='choice" + (i + 1) + "' value='" + choices[i] +
     "'>" + " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label><br>";
  } 

  /* LOAD UP QUESTION TITLE AND QUESTION ITSELF */
  questionHolder.textContent = "Question: " + (questionTracker + 1) + ". " + questions[questionTracker].question;
  /* LOAD UP ANSWERS */
  choicesHolder.innerHTML = tempChoices;

  /* SETUP, FIRST ITERATION */
  if(questionTracker == 0)
  {
    scoreHolder.textContent = "Score: 0 correctly answered questions out of " + questions.length + " total questions.";
    timeHolder.textContent = "Time: 20 seconds left."; 
    submitButton.textContent = "Submit Q";
  }
}

/* FUNCTION THAT VALIDATES ANSWER SELECTED BY USER */
function validateAnswer()
{
  /* CHECK IF QUESTION WAS ASKED, DETERMINE IF WE PROCEED TO NEXT QUESTION */
  if(wasQuestionAsked)
  {
    submitButton.textContent = "Next Q";
    clearTimeout(setTimeout);
    wasQuestionAsked = false;

    /* DETERMINE WHICH RADIO BUTTON WAS CLICKED */
    var userSelection, correctIndex;
    var radios = document.getElementsByName("quiz" + questionTracker);
    for(var i = 0; i < radios.length; i++)
    {
      /* IF RADIO BUTTON IS CHECKED */
      if(radios[i].checked)
      {
        userSelection = radios[i].value;
      }

      /* FIND CORRECT INDEX */ 
      if(radios[i].value == questions[questionTracker].correctAnswer)
      {
        correctIndex = i;
      }
    }

    /* GETS ELEMENTS BY THEIR TAG NAME SO I CAN CHANGE THEIR INDIVIDUAL STYLE */
    var labelChange = document.getElementsByTagName("label")[correctIndex].style;
    labelChange.fontWeight = "bold";
    if(userSelection == questions[questionTracker].correctAnswer)
    {
      /* INCREMENT SCORE, AND SET THE LABEL TO BE LIGHT GREEN (CORRECT ANSWER) */
      score++;
      labelChange.color = "#33cc00";
    }
    else
    {
      /* SET LABEL TO BE BRIGHT RED (INCORRECT ANSWER) */
      labelChange.color = "#cc0000";
    }

    scoreHolder.textContent = "Score: " + score + " correctly answered questions out of " + questions.length + " possible.";
    /* MOVE ON TO NEXT QUESTION */
  }
  else
  {
    wasQuestionAsked = true;
    /* RESET BUTTON TEXT TO "SUBMIT QUESTION" */
    submitButton.textContent = "Submit Q";
    /* INITIALIZE TIMER WITH 20 SECONDS */
    initTimer(intTimer);
    /* IF WE HAVE NOT YET REACHED LAST QUESTION, INCREASE Q BY ONE */
    if(questionTracker < questions.length - 1)
    {
      questionTracker++;
      askQ();
    }
    else
    {
      showFinalScore();
    }
  }
}

/* FUNCTION THAT WILL DISPLAY THE SCORE ONCE TRIVIA GAME IS OVER */
function showFinalScore()
{
  content.innerHTML = "<h2 style='color:orange;'>You've finished the Trivia Game!</h2>" + "<h2 style='color:orange;'>These are your results:</h2>" +
   "<h2 style='color:orange;'>" + score + " out of a total of " + questions.length + " questions." + "<br>" + "Your percentage was: " + Math.round(score / questions.length * 100) +
    "%</h2>" + "<br>" + "<button class='btn btn-warning' onclick='reset()'>Restart</button>";
}

/* FUNCTION THAT WILL RESET THE GAME */
function reset()
{
  location.reload();
}
/* EVENT LISTENERS: FIRST ONE FIRES WHEN PAGE LOADS, SECOND FIRES WHEN THE SUBMIT-BUTTON IS CLICKED */
window.addEventListener("load", askQ, false);
submitButton.addEventListener("click", validateAnswer, false);