package com.auca.diacare.appointment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.auca.diacare.appointment.model.Appointment;
import com.auca.diacare.appointment.model.Appointment.Status;
import com.auca.diacare.appointment.repository.AppointmentRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    @Override
    public List<Appointment> getAppointmentsByPatientEmail(String email) {
        return appointmentRepository.findByPatient_User_Email(email);
    }

    @Override
    public List<Appointment> getAppointmentsByDoctorEmail(String email) {
        return appointmentRepository.findByDoctor_User_Email(email);
    }

    @Override
    public Appointment updateStatus(Long id, Status status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }

    @Override
    public void cancelAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(Status.CANCELLED);
        appointmentRepository.save(appointment);
    }
}
