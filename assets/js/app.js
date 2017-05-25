$(document).ready(function(){
  
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);
  
})

var trivia = {
  // trivia properties
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  result: false,
  timer: 15,
  timerOn: false,
  timerId : '',
  questions: {
    q1: 'What month?',
    q2: '2',
    q3: '3',
    q4: '4'
  },
  options: {
    q1: ['May', 2, 3, 4, 5],
    q2: [1, 2, 3, 4, 5],
    q3: [1, 2, 3, 4, 5],
    q4: [1, 2, 3, 4, 5]
  },
  answers: {
    q1: 'May',
    q2: '2',
    q3: '3',
    q4: '4'
  },
  // trivia methods
  // method to initialize game
  startGame: function(){
    // show timer
    $('#timer').text(trivia.timer);
    
    // remove start button
    $('#start').remove();
    
    // ask first question
    trivia.nextQuestion();
    
  },
  // method to loop through and display questions and options 
  nextQuestion : function(){
    
    // set timer to 15 seconds each question
    trivia.timer = 15;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    
    // to prevent timer speed up
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
    // gets all the questions then indexes the current questions
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    
    // creates all the trivia guess options in the html
    $.each(Object.values(trivia.options)[trivia.currentSet], function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
  // method to decrement counter and count unanswered if timer runs out
  timerRunning : function(){
    // if timer still has time left and there are still questions left to ask
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    //  time has run out and increment unanswered, run result
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 3000);
      $('#results').html('<h3>Times up! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    
  },
  // method to evaluate the option clicked
  guessChecker : function() {
    
    // timer ID for gameResult setTimeout
    var resultId;
    
    console.log($(this).text());
    console.log(Object.values(trivia.answers)[trivia.currentSet]);
    
    // if the text of the option matches the answer of the current question
    if($(this).text() === Object.values(trivia.answers)[trivia.currentSet]){
      
      trivia.correct++;
      trivia.result = true;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 3000);
      console.log(trivia.correct);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    else{
      
      trivia.incorrect++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 3000);
      console.log(trivia.incorrect);
      $('#results').html('<h3>Sorry the answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    
  },
  // 
  guessResult : function(){
    trivia.currentSet++;
    
    if(trivia.result === true){
      //$(this).removeClass('btn-info').addClass('btn-success');
      $('.option').remove();
      trivia.nextQuestion();
      $('#results h3').remove();
    }
    else if(trivia.result === false){
      //$(this).removeClass('btn-info').addClass('btn-success');
      $('.option').remove();
      trivia.nextQuestion();
      $('#results h3').remove();
    }
    
  },
  

}
  
  
  
