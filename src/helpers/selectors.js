export function getAppointmentsForDay(state, day) {
  const apps = [];

  state.days.filter((days) => {
    if (days.name === day) {
      days.appointments.filter((appointment) => {
        apps.push(state.appointments[appointment]);
      });
    }
  });

  return apps;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const student = interview.student;

  const interviewerId = interview.interviewer;
  const realInterview = state.interviewers[interviewerId];

  return {
    student,
    realInterview,
  };
}
