import Patient from "./Patient";

const PatientsList = ({ patients, setPatient, removePatient }) => {
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen md:overflow-y-scroll">
      {patients && patients.length ? (
        <>
          <h2 className="font-black text-3xl text-center">List of Patients</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            manage your{" "}
            <span className="text-indigo-600 font-bold">
              patients and appointments
            </span>
          </p>
          {patients.map((patient) => (
            <Patient
              key={patient.id}
              patient={patient}
              setPatient={setPatient}
              removePatient={removePatient}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No patients</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Start adding patients{" "}
            <span className="text-indigo-600 font-bold">
              and they will appear in this place
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default PatientsList;
