var questions = [];
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;
$(document).ready(function(){


  $.getJSON( "resources/html.json", function( data ) {
    questions = data;
      console.log(questions);
      // Display the first question
      displayCurrentQuestion();

  }).fail(function() {
    console.log( "Error on Connection" );
  });


  $('.quiz-button').click(function(){
    $('.main-wrapper').hide();
    $('.quiz-container').show();
  });

  $(this).find('.quizMessage').hide();

  $(this).find('.nextButton').click(function(){
    if (!quizOver) {

         value = $("input[type='radio']:checked").val();

         if (value == undefined) {
            $(document).find(".quizMessage").show();
         } else {
             // TODO: Remove any message -> not sure if this is efficient to call this each time....
             $(document).find(".quizMessage").hide();

             if (value == questions[currentQuestion].answer) {
                 correctAnswers++;
             }

             currentQuestion++; // Since we have already displayed the first question on DOM ready
             if (currentQuestion < questions.length) {
                 displayCurrentQuestion();
             } else {
                 displayScore();
                 //                    $(document).find(".nextButton").toggle();
                 //                    $(document).find(".playAgainButton").toggle();
                 // Change the text in the next button to ask if user wants to play again
                 $(document).find(".quiz-container").hide();
                 quizOver = true;
             }
         }
     }
  });
  $(this).find('.result-container > .play-again').on("click", function(){
    resetQuiz();
    $(this).parent().hide();
    $('.quiz-container').show();
    displayCurrentQuestion();
     quizOver = false;
  });


});
// To display current question
function displayCurrentQuestion(){
    var question = (currentQuestion+1) +". "+ questions[currentQuestion].question;
    var questionClass = $(document).find(".quiz-container > .question");
    var choiceList = $(document).find(".quiz-container > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        // convert html Markup to printable string
        choice = choice.replace(/[<>&\n]/g, function(x) {
            return {
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
               '\n': '<br />'
            }[x];
        });
        $('<li><input type="radio" value=' + i + ' name="quizRadio" />' + choice + '</li>').appendTo(choiceList);
    }
}


function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    //hideScore();
}

function displayScore() {
    $(document).find(".result-container > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".result-container").show();
}

function hideScore() {
    $(document).find(".result").hide();
}
