export const getQuestions = async () => {
  const response = await fetch('http://localhost:3000/questions');
  if (!response.ok) {
        console.error("Failed to fetch questions");
    }
  return await response.json();
}