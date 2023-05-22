document.getElementById('quiz').addEventListener('submit', function(event) {
    event.preventDefault();

    var correctAnswer = "3";
    var userAnswer = document.querySelector('input[name="quiz"]:checked').value;
    
    if(userAnswer === correctAnswer) {
        alert('Correct!');
    } else {
        alert('Sorry, that is incorrect. The correct answer is ' + correctAnswer);
    }
    });