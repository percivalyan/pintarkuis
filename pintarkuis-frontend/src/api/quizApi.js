const fetchQuestions = async () => {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=15');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.results) {
            return data.results;
        } else {
            throw new Error('Invalid data format');
        }
    } catch (error) {
        console.error('Fetch questions failed:', error);
        return []; // Return an empty array if there is an error
    }
};

export default fetchQuestions;
