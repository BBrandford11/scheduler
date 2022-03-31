import axios from "axios";
import { useState, useEffect } from "react";

function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

   // sets the current day state
  const setDay = (day) => setState({ ...state, day });

   // fetches data from scheduler-api with axios and updates setState
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

   // remove an interview spot
  function removeSpots(state, status = false) {
    const eachDays = Object.values(state.days);

    const dayArr = eachDays.map((day) => {
      if (day.name === state.day && status === false) {
        day.spots -= 1;
      }
      return null;
    });

    return dayArr;
  }

  const addSpots = (state) => {
    const eachDays = Object.values(state.days);
    const dayArr = eachDays.map((day) => {
      if (day.name === state.day) {
        day.spots += 1;
      }
      return null;
    });
    return dayArr;
  };

  // adds an interview appointment to the database with axios
  function bookInterview(id, interview, status) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { ...appointment }).then(() => {
      const daysarr = removeSpots(state, status);
      setState({ ...state, appointments, daysarr });
    });
  }

    // removes an interview appointment from database with axios
  function cancleInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      const dayarr = addSpots(state);
      setState({ ...state, dayarr, appointments });
    });
  }

  return { state, useEffect, cancleInterview, bookInterview, setDay };
}

export default useApplicationData;
