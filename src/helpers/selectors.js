export function getAppointmentsForDay(state, day) {
  const apps = [];

  state.days.filter((days) => {
    if (days.name === day) {
      days.appointments.filter((appointment) => {
        apps.push(state.appointments[appointment]);
        return null
      });
    }
    return null
  });

  return apps;
}

export function getInterviewersForDay(state, day) {
  const interviewersArr = [];

  if (state.days.length === 0) {
    return [];
  }

  state.days.filter((dayItem) => {
    if (dayItem.name === day) {
      dayItem.interviewers.filter((interviewer) => {
        if (interviewer.id === state.interviewers.id) {
          interviewersArr.push(state.interviewers[interviewer]);
        }
        return null
      });
    }
    return null
  });
  return interviewersArr;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  };
}
