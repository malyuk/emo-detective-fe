export const fetchLesson = async (lessonId) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/lessons/${lessonId}`
  );
  const data = await response.json();
  return data;
};

export const postStat = async (userId, emotions, engagementScore) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/stats`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          emotions: emotions,
          engagementScore: engagementScore,
        }),
      }
    );
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
