import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment } from "../redux/appointments/bookAppointmentSlice";
import { fetchDocData } from "../redux/doctors/doctorSlice";
import { currentUser } from "../redux/user/userSlice";
import "../styles/appointment.css";
import { Calendar } from "primereact/calendar";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const [doctor, setDoctor] = useState();
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const navigate = useNavigate();

  const user = useSelector(currentUser);

  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(fetchDocData());
  }, []);

  const handleChange = (e) => {
    setDoctor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointment = {
      appointment_date: appointmentDate,
      start_time: startTime,
      end_time: endTime,
      doctor_id: doctor,
    };
    dispatch(bookAppointment(appointment));
    navigate("/appointments");
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row appointment-form">
          <div className="col-md-6 px-0">
            <div className="form-content d-flex flex-column justify-content-center align-items-center">
              <h2 className="mb-2">Appointment Request Form</h2>
              <p>
                Please fill in this form in order to book an appointment with
                our specialist. Mandatory fields are marked with an asterisk
                (*).
              </p>
              <img
                src="https://res.cloudinary.com/dxsom7jmx/image/upload/v1678099548/undraw_medicine_b-1-ol_vnmimy.svg"
                alt=""
                className="img-fluid appointment-img d-none d-md-inline"
              />
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <form onSubmit={handleSubmit} className="container px-md-5">
              <div className="form-group mb-2">
                <label htmlFor="name" className="appointment-label">
                  Name
                </label>
                <input
                  id="name"
                  className="form-control form-input shadow-none "
                  disabled
                  type="text"
                  value={user && user.name}
                />
              </div>

              <div className="form-group mb-2">
                <label htmlFor="doctor" className="appointment-label">
                  Select a doctor
                  <span className="text-danger">*</span>
                </label>
                <br />
                <select
                  className="form-control form-input"
                  onChange={handleChange}
                  name="doctor_id"
                >
                  <option value="">Select a doctor</option>
                  {doctors &&
                    doctors.map((doctor) => (
                      <option
                        className="select-input"
                        key={doctor.id}
                        value={doctor.id}
                      >
                        {doctor.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="form-group mb-2">
                <label htmlFor="date" className="appointment-label">
                  Date
                  <span className="text-danger">*</span>
                </label>
                <Calendar
                  // className="form-control form-input shadow-none"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.value)}
                  showIcon
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="state-time" className="appointment-label">
                  Start Time
                  <span className="text-danger">*</span>
                </label>
                <Calendar
                  hourFormat="12"
                  id="calendar-timeonly"
                  value={startTime}
                  onChange={(e) => setStartTime(e.value)}
                  timeOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="end-time" className="appointment-label">
                  End Time
                  <span className="text-danger">*</span>
                </label>
                <Calendar
                  hourFormat="12"
                  id="calendar-timeonly"
                  value={endTime}
                  onChange={(e) => setEndTime(e.value)}
                  timeOnly
                />
              </div>
              <button
                type="submit"
                className="mt-4 btn btn-success-cus d-block w-100 rounded-pill"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Appointment;