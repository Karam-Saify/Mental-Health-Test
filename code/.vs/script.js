
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // === User Information Form Elements ===
    const form = document.getElementById("user-info-form");
    const errorMessage = document.getElementById("error-message");

    // === Assessment Section Elements ===
    const assessmentSection = document.getElementById('assessment-section');
    const questionContainer = document.getElementById('question-container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const displayUsername = document.getElementById('display-username');
    const displayUserage = document.getElementById('display-userage');

    // === Result Section Elements ===
    const resultSection = document.getElementById('result-section');
    const resultName = document.getElementById('result-name');
    const resultAge = document.getElementById('result-age');
    const totalScoreElement = document.getElementById('total-score');
    const assessmentResult = document.getElementById('assessment-result');
    const adviceMessage = document.getElementById('advice-message');

    // === Share Buttons ===
    const shareFacebook = document.getElementById('share-facebook');
    const shareX = document.getElementById('share-x');
    const shareWhatsApp = document.getElementById('share-whatsapp');
    const shareLinkedIn = document.getElementById('share-linkedin');

    // === Variables ===
    let currentQuestionIndex = 0;
    let userResponses = [];
    let totalScore = 0;
    let username = '';
    let userage = '';

    // === Questions Array Based on PHQ-9 and GAD-7 Scales ===
    const questions = [{
        text: "Over the last two weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        text: "Over the last two weeks, how often have you had trouble relaxing?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        text: "Over the last two weeks, how often have you been so restless that it's hard to sit still?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        text: "Over the last two weeks, how often have you been easily annoyed or irritable?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        text: "Over the last two weeks, how often have you felt afraid as if something awful might happen?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        text: "Over the last two weeks, how often have you had little interest or pleasure in doing things?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        text: "Over the last two weeks, how often have you felt down, depressed, or hopeless?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        text: "Over the last two weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        text: "Over the last two weeks, how often have you felt tired or had little energy?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        text: "Over the last two weeks, how often have you had poor appetite or overeating?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        text: "Over the last two weeks, how often have you felt bad about yourself—or that you are a failure or have let yourself or your family down?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        text: "Over the last two weeks, how often have you had trouble concentrating on things, such as reading the newspaper or watching television?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        text: "Over the last two weeks, how often have you moved or spoken so slowly that other people could have noticed? Or the opposite—being so fidgety or restless that you have been moving around a lot more than usual?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        text: "Over the last two weeks, how often have you had thoughts that you would be better off dead or of hurting yourself in some way?",
        options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
        ]
    },
    {
        text: "If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
        options: [
            { text: "Not difficult at all", score: 0 },
            { text: "Somewhat difficult", score: 1 },
            { text: "Very difficult", score: 2 },
            { text: "Extremely difficult", score: 3 }
        ]
    }
    ];

    // === Form Validation Functions ===

    /**
     * Validates the username input.
     * @param {string} name - The username input.
     * @returns {boolean} - True if valid, false otherwise.
     */
    function validateUsername(name) {
        const usernameRegex = /^[a-zA-Z\s]+$/;
        return usernameRegex.test(name.trim());
    }

    /**
     * Validates the age input.
     * @param {string} age - The age input.
     * @returns {boolean} - True if valid, false otherwise.
     */
    function validateAge(age) {
        return /^\d{1,3}$/.test(age) && age >= 13 && age <= 120;
    }

    // === Display Question Function ===

    /**
     * Displays the current question and options.
     */
    function displayQuestion() {
        const question = questions[currentQuestionIndex];
        const totalQuestions = questions.length;
        const progressPercentage = ((currentQuestionIndex) / totalQuestions) * 100;

        // Update progress bar
        document.getElementById('progress-fill').style.width = `${progressPercentage}%`;

        // Generate question HTML
        questionContainer.innerHTML = `
            <h3>Question ${currentQuestionIndex + 1} of ${totalQuestions}</h3>
            <p>${question.text}</p>
            <ul>
                ${question.options.map((option) => `
                    <li>
                        <label class="answer-option ${userResponses[currentQuestionIndex] === option.score ? 'selected' : ''}">
                            <input type="radio" name="option" value="${option.score}" ${userResponses[currentQuestionIndex] === option.score ? 'checked' : ''}>
                            ${option.text}
                        </label>
                    </li>
                `).join('')}
            </ul>
        `;

        // Update navigation buttons
        prevButton.disabled = currentQuestionIndex === 0;
        nextButton.disabled = !document.querySelector('input[name="option"]:checked');
        nextButton.textContent = currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next';
    }

    // === Save Response Function ===

    /**
     * Saves the user's selected response for the current question.
     */
    function saveResponse() {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            userResponses[currentQuestionIndex] = parseInt(selectedOption.value);
        }
    }

    // === Calculate and Display Results Function ===

    /**
     * Calculates the total score and displays the assessment results.
     */
    function calculateResults() {
        // Calculate total score
        totalScore = userResponses.reduce((acc, curr) => acc + curr, 0);

        // Hide assessment section and show result section
        assessmentSection.style.display = 'none';
        resultSection.style.display = 'block';

        // Display user information and total score
        resultName.textContent = username;
        resultAge.textContent = userage;
        totalScoreElement.textContent = totalScore;

        // Determine assessment result based on total score
        let assessmentText = '';
        if (totalScore >= 0 && totalScore <= 4) {
            assessmentText = 'Minimal Anxiety/Depression';
        } else if (totalScore >= 5 && totalScore <= 9) {
            assessmentText = 'Mild Anxiety/Depression';
        } else if (totalScore >= 10 && totalScore <= 14) {
            assessmentText = 'Moderate Anxiety/Depression';
        } else if (totalScore >= 15 && totalScore <= 19) {
            assessmentText = 'Moderately Severe Anxiety/Depression';
        } else {
            assessmentText = 'Severe Anxiety/Depression';
        }

        assessmentResult.textContent = assessmentText;

        // Provide advice based on the score
        if (totalScore >= 15) {
            adviceMessage.textContent = 'We strongly recommend you consult a mental health professional for a comprehensive evaluation.';
        } else if (totalScore >= 10) {
            adviceMessage.textContent = 'Consider reaching out to a mental health professional for guidance.';
        } else {
            adviceMessage.textContent = 'Your results suggest minimal symptoms, but if you have concerns, please consult a professional.';
        }

        // Special attention for self-harm question (index 13)
        if (userResponses[13] >= 1) {
            alert('Important: If you are experiencing thoughts of self-harm, please seek immediate professional help.');
            adviceMessage.textContent = 'Please seek immediate assistance from a mental health professional or a trusted individual.';
        }

        // Prepare shareable message
        const shareMessage = `I just completed a mental health assessment and my result is: ${assessmentText}.`;

        // Encode message for URLs
        const encodedMessage = encodeURIComponent(shareMessage + ' Check it out here: [Your Website URL]');

        // Update share links with encoded message
        shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=[Your Website URL]&quote=${encodedMessage}`;
        shareX.href = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
        shareWhatsApp.href = `https://api.whatsapp.com/send?text=${encodedMessage}`;
        shareLinkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
    }

    // === Event Listeners ===

    // Form submission handler
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get and validate user inputs
        username = form.username.value.trim();
        userage = form.userage.value.trim();
        errorMessage.textContent = '';

        if (!validateUsername(username)) {
            errorMessage.textContent = "Invalid name. Only alphabetical characters are allowed.";
            return;
        }

        if (!validateAge(userage)) {
            errorMessage.textContent = "Invalid age. Please enter a valid number between 13 and 120.";
            return;
        }

        // Proceed to assessment
        form.parentElement.style.display = 'none';
        assessmentSection.style.display = 'block';
        displayUsername.textContent = username;
        displayUserage.textContent = userage;
        displayQuestion();
    });

    // Previous button handler
    prevButton.addEventListener('click', () => {
        saveResponse();
        currentQuestionIndex--;
        displayQuestion();
    });

    // Next/Submit button handler
    nextButton.addEventListener('click', () => {
        saveResponse();
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            calculateResults();
        }
    });

    // Option selection handler
    questionContainer.addEventListener('change', (e) => {
        if (e.target.name === 'option') {
            nextButton.disabled = false;

            // Update selected option styling
            const options = document.querySelectorAll('.answer-option');
            options.forEach(option => option.classList.remove('selected'));
            e.target.parentElement.classList.add('selected');
        }
    });
});
