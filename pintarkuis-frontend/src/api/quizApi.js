const fetchQuestions = async () => {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=15');
        const data = await response.json();
        if (data.results) {
            return data.results;
        } else {
            throw new Error('No questions found');
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
};

export default fetchQuestions;
