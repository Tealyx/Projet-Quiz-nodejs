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

    // conteneur pour les champs dynamiques
    const champs = document.createElement("div");

    bloc.appendChild(champs);

    const zone = document.getElementById("zoneQuestions");
    zone.appendChild(bloc);

    // quand on choisit un type
    select.addEventListener("change", function() {

        champs.innerHTML = "";

        if (select.value === "ouverte") {

            const questionInput = document.createElement("input");
            questionInput.type = "text";
            questionInput.placeholder = "Ecris la question";

            const answerInput = document.createElement("input");
            answerInput.type = "text";
            answerInput.placeholder = "Ecris la réponse";

            const validateButton = document.createElement("button");
            validateButton.textContent = "Valider";
            validateButton.type = "button";

            champs.appendChild(questionInput);
            champs.appendChild(answerInput);
            champs.appendChild(validateButton);

            validateButton.addEventListener("click", function() {

                const question = questionInput.value;
                const answer = answerInput.value;
                const questionText = document.createElement("p");
                const answerText = document.createElement("p");
                
                questionInput.remove();
                answerInput.remove();
                validateButton.remove();
                select.remove();
                
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

                console.log(question, answer);

            });

        }

        if (select.value === "fermee") {

            const questionInput = document.createElement("input");
            questionInput.type = "text";
            questionInput.placeholder = "Ecris la question";

            champs.appendChild(questionInput);

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

            champs.appendChild(radioOui);
            champs.appendChild(labelOui);

            champs.appendChild(radioNon);
            champs.appendChild(labelNon);

            const validateButton = document.createElement("button");
            validateButton.textContent = "Valider";
            validateButton.type = "button";

            champs.appendChild(validateButton);

            validateButton.addEventListener("click", function() {

                const question = questionInput.value;

                let answer = "";

                if (radioOui.checked) {
                    answer = "Oui";
                }

                if (radioNon.checked) {
                    answer = "Non";
                }

                // envoyer la question et la réponse au serveur
                fetch("/questions/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        question: question,
                        type: "fermee",
                        bonne_reponse: answer
                    })
                })

                select.remove();
                questionInput.remove();
                radioOui.remove();
                labelOui.remove();
                radioNon.remove();
                labelNon.remove();
                validateButton.remove();

            });

        }

        if (select.value === "qcm") {

            const questionInput = document.createElement("input");
            questionInput.type = "text";
            questionInput.placeholder = "Ecris la question";

            champs.appendChild(questionInput);

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

                champs.appendChild(line);

                answers.push({
                    radio: radio,
                    input: answerInput
                });
            }

            const validateButton = document.createElement("button");
            validateButton.textContent = "Valider";
            validateButton.type = "button";

            champs.appendChild(validateButton);

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

                // envoyer la question et la réponse au serveur
                fetch("/questions/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        question: question,
                        type: "qcm",
                        toutes_reponses: toutesReponses,
                        bonne_reponse: bonneReponse
                    })
                })

                select.remove();
                questionInput.remove();
                answers.forEach(function(answer) {
                    answer.input.remove();
                    answer.radio.remove();
                });
                validateButton.remove();

            });

        }

    });

});