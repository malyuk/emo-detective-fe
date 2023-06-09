export const fetchLesson = async (lessonId) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/lesson/${lessonId}`
  );
  const data = await response.json();
  return data;
};

export const postStat = async (userId, emotions, engagementScore, lessonId) => {
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
          lessonId: lessonId,
        }),
      }
    );
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
