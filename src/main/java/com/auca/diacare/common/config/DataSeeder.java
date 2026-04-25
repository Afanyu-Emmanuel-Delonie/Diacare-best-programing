package com.auca.diacare.common.config;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.auca.diacare.appointment.model.Appointment;
import com.auca.diacare.appointment.repository.AppointmentRepository;
import com.auca.diacare.auth.model.Role;
import com.auca.diacare.auth.model.User;
import com.auca.diacare.auth.repository.UserRepository;
import com.auca.diacare.doctor.model.Doctor;
import com.auca.diacare.doctor.repository.DoctorRepository;
import com.auca.diacare.glucose.model.GlucoseReading;
import com.auca.diacare.glucose.model.GlucoseReading.MealContext;
import com.auca.diacare.glucose.model.GlucoseReading.Unit;
import com.auca.diacare.glucose.repository.GlucoseReadingRepository;
import com.auca.diacare.metrics.model.HealthMetrics;
import com.auca.diacare.metrics.repository.HealthMetricsRepository;
import com.auca.diacare.notification.model.Notification;
import com.auca.diacare.notification.model.Notification.Type;
import com.auca.diacare.notification.repository.NotificationRepository;
import com.auca.diacare.patient.model.Patient;
import com.auca.diacare.patient.repository.PatientRepository;
import com.auca.diacare.prescription.model.Prescription;
import com.auca.diacare.prescription.repository.PrescriptionRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final GlucoseReadingRepository glucoseRepository;
    private final HealthMetricsRepository metricsRepository;
    private final NotificationRepository notificationRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, PatientRepository patientRepository,
            DoctorRepository doctorRepository, AppointmentRepository appointmentRepository,
            PrescriptionRepository prescriptionRepository, GlucoseReadingRepository glucoseRepository,
            HealthMetricsRepository metricsRepository, NotificationRepository notificationRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.glucoseRepository = glucoseRepository;
        this.metricsRepository = metricsRepository;
        this.notificationRepository = notificationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Skip seeding if data already exists
        if (userRepository.count() > 0) return;

        System.out.println(">>> Seeding DiaCare database...");

        // ── Users ──────────────────────────────────────────────────────────────
        User adminUser = userRepository.save(new User("admin", "admin@diacare.com",
                passwordEncoder.encode("Admin@123"), Role.ADMIN));

        User doctorUser = userRepository.save(new User("dr.mugisha", "mugisha@diacare.com",
                passwordEncoder.encode("Doctor@123"), Role.DOCTOR));

        User doctorUser2 = userRepository.save(new User("dr.uwimana", "uwimana@diacare.com",
                passwordEncoder.encode("Doctor@123"), Role.DOCTOR));

        User patientUser = userRepository.save(new User("jean.baptiste", "jean@diacare.com",
                passwordEncoder.encode("Patient@123"), Role.PATIENT));

        User patientUser2 = userRepository.save(new User("alice.mutoni", "alice@diacare.com",
                passwordEncoder.encode("Patient@123"), Role.PATIENT));

        // ── Doctor Profiles ────────────────────────────────────────────────────
        Doctor doctor1 = new Doctor();
        doctor1.setUser(doctorUser);
        doctor1.setSpecialization("Endocrinology");
        doctor1.setLicenseNumber("RW-MED-001");
        doctor1.setYearsOfExperience(10);
        doctorRepository.save(doctor1);

        Doctor doctor2 = new Doctor();
        doctor2.setUser(doctorUser2);
        doctor2.setSpecialization("Internal Medicine");
        doctor2.setLicenseNumber("RW-MED-002");
        doctor2.setYearsOfExperience(7);
        doctorRepository.save(doctor2);

        // ── Patient Profiles ───────────────────────────────────────────────────
        Patient patient1 = new Patient();
        patient1.setUser(patientUser);
        patient1.setDiabetesType("TYPE_2");
        patient1.setDateOfBirth(LocalDate.of(1985, 3, 12));
        patient1.setGender("MALE");
        patient1.setTargetHbA1c(7.0);
        patientRepository.save(patient1);

        Patient patient2 = new Patient();
        patient2.setUser(patientUser2);
        patient2.setDiabetesType("TYPE_1");
        patient2.setDateOfBirth(LocalDate.of(1995, 7, 22));
        patient2.setGender("FEMALE");
        patient2.setTargetHbA1c(6.5);
        patientRepository.save(patient2);

        // ── Appointments ───────────────────────────────────────────────────────
        Appointment apt1 = new Appointment();
        apt1.setPatient(patient1);
        apt1.setDoctor(doctor1);
        apt1.setAppointmentDate(LocalDateTime.now().plusDays(3));
        apt1.setStatus(Appointment.Status.CONFIRMED);
        apt1.setNotes("Quarterly HbA1c review");
        appointmentRepository.save(apt1);

        Appointment apt2 = new Appointment();
        apt2.setPatient(patient1);
        apt2.setDoctor(doctor1);
        apt2.setAppointmentDate(LocalDateTime.now().minusDays(10));
        apt2.setStatus(Appointment.Status.COMPLETED);
        apt2.setNotes("Initial consultation");
        appointmentRepository.save(apt2);

        Appointment apt3 = new Appointment();
        apt3.setPatient(patient2);
        apt3.setDoctor(doctor2);
        apt3.setAppointmentDate(LocalDateTime.now().plusDays(7));
        apt3.setStatus(Appointment.Status.PENDING);
        apt3.setNotes("Insulin dosage adjustment");
        appointmentRepository.save(apt3);

        // ── Prescriptions ──────────────────────────────────────────────────────
        Prescription rx1 = new Prescription();
        rx1.setPatient(patient1);
        rx1.setDoctor(doctor1);
        rx1.setAppointment(apt2);
        rx1.setMedication("Metformin");
        rx1.setDosage("500mg twice daily");
        rx1.setInstructions("Take with meals. Monitor blood sugar daily.");
        rx1.setStartDate(LocalDate.now().minusDays(10));
        rx1.setEndDate(LocalDate.now().plusDays(80));
        prescriptionRepository.save(rx1);

        Prescription rx2 = new Prescription();
        rx2.setPatient(patient1);
        rx2.setDoctor(doctor1);
        rx2.setMedication("Glibenclamide");
        rx2.setDosage("5mg once daily before breakfast");
        rx2.setInstructions("Do not skip meals while on this medication.");
        rx2.setStartDate(LocalDate.now().minusDays(10));
        rx2.setEndDate(LocalDate.now().plusDays(80));
        prescriptionRepository.save(rx2);

        Prescription rx3 = new Prescription();
        rx3.setPatient(patient2);
        rx3.setDoctor(doctor2);
        rx3.setMedication("Insulin Glargine");
        rx3.setDosage("10 units subcutaneous at bedtime");
        rx3.setInstructions("Rotate injection sites. Store insulin in refrigerator.");
        rx3.setStartDate(LocalDate.now().minusDays(30));
        prescriptionRepository.save(rx3);

        // ── Glucose Readings — patient1 (last 10 days) ─────────────────────────
        List<double[]> readings = List.of(
                new double[]{8.2, 0}, new double[]{6.1, 1}, new double[]{9.4, 2},
                new double[]{7.8, 3}, new double[]{6.5, 4}, new double[]{10.1, 5},
                new double[]{7.2, 6}, new double[]{8.9, 7}, new double[]{6.8, 8},
                new double[]{7.5, 9}
        );
        MealContext[] contexts = {MealContext.FASTING, MealContext.AFTER_MEAL, MealContext.BEFORE_MEAL,
                MealContext.AFTER_MEAL, MealContext.FASTING, MealContext.AFTER_MEAL,
                MealContext.BEDTIME, MealContext.AFTER_MEAL, MealContext.FASTING, MealContext.BEFORE_MEAL};

        for (int i = 0; i < readings.size(); i++) {
            GlucoseReading gr = new GlucoseReading();
            gr.setPatient(patient1);
            gr.setValue(readings.get(i)[0]);
            gr.setUnit(Unit.MMOL_L);
            gr.setMealContext(contexts[i]);
            gr.setRecordedAt(LocalDateTime.now().minusDays((long) readings.get(i)[1]));
            glucoseRepository.save(gr);
        }

        // ── Glucose Readings — patient2 ────────────────────────────────────────
        double[] p2Values = {5.8, 7.2, 6.4, 8.1, 5.5};
        MealContext[] p2Contexts = {MealContext.FASTING, MealContext.AFTER_MEAL,
                MealContext.BEFORE_MEAL, MealContext.AFTER_MEAL, MealContext.BEDTIME};
        for (int i = 0; i < p2Values.length; i++) {
            GlucoseReading gr = new GlucoseReading();
            gr.setPatient(patient2);
            gr.setValue(p2Values[i]);
            gr.setUnit(Unit.MMOL_L);
            gr.setMealContext(p2Contexts[i]);
            gr.setRecordedAt(LocalDateTime.now().minusDays(i));
            glucoseRepository.save(gr);
        }

        // ── Health Metrics ─────────────────────────────────────────────────────
        HealthMetrics m1 = new HealthMetrics();
        m1.setPatient(patient1);
        m1.setWeight(88.0);
        m1.setHeight(175.0);
        m1.setHba1c(8.1);
        m1.setBloodPressureSystolic(138);
        m1.setBloodPressureDiastolic(88);
        m1.setCholesterol(5.2);
        m1.setRecordedAt(LocalDateTime.now().minusDays(5));
        metricsRepository.save(m1);

        HealthMetrics m2 = new HealthMetrics();
        m2.setPatient(patient2);
        m2.setWeight(62.0);
        m2.setHeight(165.0);
        m2.setHba1c(7.2);
        m2.setBloodPressureSystolic(118);
        m2.setBloodPressureDiastolic(76);
        m2.setCholesterol(4.1);
        m2.setRecordedAt(LocalDateTime.now().minusDays(2));
        metricsRepository.save(m2);

        // ── Notifications ──────────────────────────────────────────────────────
        Notification n1 = new Notification();
        n1.setRecipient(patientUser);
        n1.setType(Type.APPOINTMENT_REMINDER);
        n1.setMessage("Reminder: You have an appointment with Dr. Mugisha in 3 days.");
        notificationRepository.save(n1);

        Notification n2 = new Notification();
        n2.setRecipient(patientUser);
        n2.setType(Type.PRESCRIPTION_ISSUED);
        n2.setMessage("Dr. Mugisha has issued a new prescription: Metformin 500mg.");
        notificationRepository.save(n2);

        Notification n3 = new Notification();
        n3.setRecipient(patientUser2);
        n3.setType(Type.GENERAL);
        n3.setMessage("Your HbA1c result is available. Please review with your doctor.");
        notificationRepository.save(n3);

        System.out.println(">>> Seeding complete.");
        System.out.println(">>> Swagger UI: http://localhost:8085/swagger-ui.html");
        System.out.println(">>> Test credentials:");
        System.out.println("    Admin:   admin@diacare.com   / Admin@123");
        System.out.println("    Doctor:  mugisha@diacare.com / Doctor@123");
        System.out.println("    Patient: jean@diacare.com    / Patient@123");
        System.out.println("    Patient: alice@diacare.com   / Patient@123");
    }
}
