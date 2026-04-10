const buttonAddQuestion = document.getElementById("buttonAddQuestion");

buttonAddQuestion.addEventListener("click", function() {

    // créer un bloc pour UNE question
    const bloc = document.createElement("div");

    // menu déroulant
    const select = document.createElement("select");

    const option1 = document.createElement("option");
    option1.value = "";
    option1.textContent = "Choisir un type";

    const option2 = document.createElement("option");
    option2.value = "ouverte";
    option2.textContent = "Question ouverte";

    const option3 = document.createElement("option");
    option3.value = "fermee";
    option3.textContent = "Question fermée";

    const option4 = document.createElement("option");
    option4.value = "qcm";
    option4.textContent = "QCM";

    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    select.appendChild(option4);

    bloc.appendChild(select);

    const zone = document.getElementById("zoneQuestions");
    zone.appendChild(bloc);

    // quand on choisit un type
    select.addEventListener("change", function() {

        if (select.value === "ouverte") {

            const questionInput = document.createElement("input");
            questionInput.type = "text";
            questionInput.placeholder = "Ecris la question";

            const answerInput = document.createElement("input");
            answerInput.type = "text";
            answerInput.placeholder = "Ecris la réponse";

            const validateButton = document.createElement("button");
            validateButton.textContent = "Valider";

            bloc.appendChild(questionInput);
            bloc.appendChild(answerInput);
            bloc.appendChild(validateButton);

            validateButton.addEventListener("click", function() {

                const question = questionInput.value;
                const answer = answerInput.value;


                // envoyer la question et la réponse au serveur
                fetch("/questions/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        question: question,
                        type: "ouverte",
                        bonne_reponse: answer
                    })
                })
                /* Affiche questions reponses pour DEBUG
                const questionText = document.createElement("p");
                questionText.textContent = "Question : " + question;

                const answerText = document.createElement("p");
                answerText.textContent = "Réponse : " + answer;

                questionInput.replaceWith(questionText);
                answerInput.replaceWith(answerText);*/

                validateButton.remove();

            });

        }

        if (select.value === "fermee") {

            const questionInput = document.createElement("input");
            questionInput.type = "text";
            questionInput.placeholder = "Ecris la question";

            bloc.appendChild(questionInput);

            // bouton Oui
            const radioOui = document.createElement("input");
            radioOui.type = "radio";
            radioOui.name = "reponseFermee";

            const labelOui = document.createElement("label");
            labelOui.textContent = "Oui";

            // bouton Non
            const radioNon = document.createElement("input");
            radioNon.type = "radio";
            radioNon.name = "reponseFermee";

            const labelNon = document.createElement("label");
            labelNon.textContent = "Non";

            bloc.appendChild(radioOui);
            bloc.appendChild(labelOui);

            bloc.appendChild(radioNon);
            bloc.appendChild(labelNon);

            const validateButton = document.createElement("button");
            validateButton.textContent = "Valider";

            bloc.appendChild(validateButton);

            validateButton.addEventListener("click", function() {

                const question = questionInput.value;

                let answer = "";

                if (radioOui.checked) {
                    answer = "Oui";
                }

                if (radioNon.checked) {
                    answer = "Non";
                }

                bloc.innerHTML = "";

                const questionText = document.createElement("p");
                questionText.textContent = "Question : " + question;

                const answerText = document.createElement("p");
                answerText.textContent = "Réponse : " + answer;

                bloc.appendChild(questionText);
                bloc.appendChild(answerText);

            });

        }

        if (select.value === "qcm") {

            const questionInput = document.createElement("input");
            questionInput.type = "text";
            questionInput.placeholder = "Ecris la question";

            bloc.appendChild(questionInput);

            const answers = [];

            for (let i = 1; i <= 4; i++) {

                const line = document.createElement("div");

                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = "bonneReponse";

                const answerInput = document.createElement("input");
                answerInput.type = "text";
                answerInput.placeholder = "Réponse " + i;

                line.appendChild(radio);
                line.appendChild(answerInput);

                bloc.appendChild(line);

                answers.push({
                    radio: radio,
                    input: answerInput
                });
            }

            const validateButton = document.createElement("button");
            validateButton.textContent = "Valider";

            bloc.appendChild(validateButton);

            validateButton.addEventListener("click", function() {

                const question = questionInput.value;

                let bonneReponse = "";
                let toutesReponses = [];

                // parcourir les 4 réponses
                for (let i = 0; i < answers.length; i++) {

                    const texte = answers[i].input.value;
                    toutesReponses.push(texte);

                    if (answers[i].radio.checked) {
                        bonneReponse = texte;
                    }

                }

                const questionText = document.createElement("p");
                questionText.textContent = "Question : " + question;

                bloc.innerHTML = "";

                bloc.appendChild(questionText);

                toutesReponses.forEach(function(rep) {

                    const p = document.createElement("p");

                    if (rep === bonneReponse) {
                        p.textContent = "✔ " + rep;
                    }
                    else {
                        p.textContent = rep;
                    }

                    bloc.appendChild(p);

                });

            });

        }

    });

});