export const fetchLesson = async (lessonId) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/lessons/${lessonId}`
  );
  const data = await response.json();
  return data;
};
