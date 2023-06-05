require(['config'] , function() {
define(['toml'], function (toml) {
    //const fs = require('fs');


    let parsedObject;


    function parse_and_generate_form(fileName) {
        // Read the TOML file
        const filePath = "https://raw.githubusercontent.com/salma-emara/aps105-book/quizzes/quiz/" + fileName + ".toml";
        //const tomlString = fs.readFileSync(filePath, 'utf8');


        fetch(filePath)
            .then(response => response.text())
            .then(fileContent => {
                parsedObject = toml.parse(fileContent);


                // Access the data from the parsed object
                const question = parsedObject.question;
                const choices = parsedObject.choices;
                const hint = parsedObject.hint;


                //generate the quiz form in HTML
                const form = document.getElementById("quizForm");
                document.getElementById("question").innerHTML = question;
                const choicesElement = document.getElementById("choices");


                // Create a radio button choices
                for (let i = 0; i < choices.length; i++) {


                    const choice = choices[i];


                    //create radio buttons
                    const radioButton = document.createElement("input");
                    radioButton.type = "radio";
                    radioButton.name = "choice";
                    radioButton.value = choice;


                    //add labels
                    const label = document.createElement("label");
                    label.textContent = choice;


                    //append the buttons to Choices element
                    choicesElement.appendChild(radioButton);
                    choicesElement.appendChild(label);
                    choicesElement.appendChild(document.createElement("br"));
                }
                //console.log(fileContent);


                function handle_submission() {
                    const answer = parsedObject.answer;
                    const selectedChoice = document.querySelector("input[name='choice']:checked");


                    if (selectedChoice) {
                        if (answer === selectedChoice.value) {
                            document.getElementById("message").innerHTML = "correct answer!";
                        }
                        else {
                            document.getElementById("message").innerHTML = "wrong answer" + hint;
                        }
                    }
                    else {
                        document.getElementById("message").innerHTML = "please make a selection";
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
            }
            );
    }
});
});
