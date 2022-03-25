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
