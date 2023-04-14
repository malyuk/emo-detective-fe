export const fetchLesson = async (lessonId) => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/lesson/${lessonId}`
  );
  const data = await response.json();
  return data;
};
