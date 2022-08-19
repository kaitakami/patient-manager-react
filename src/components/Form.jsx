import { useState, useEffect } from "react";
import Error from "./Error";

const Form = ({ setPatients, patients, patient, setPatient }) => {
  const [petName, setPetName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(patient).length > 0) {
      setPetName(patient.petName);
      setOwnerName(patient.ownerName);
      setEmail(patient.email);
      setDate(patient.date);
      setSymptoms(patient.symptoms);
    }
  }, [patient]);

  const generateId = () => {
    const random = Math.random().toString(36).substring(2);
    const date = Date.now().toString(36);
    return random + date;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if ([petName, ownerName, email, date, symptoms].includes("")) {
      setError(true);
      return;
    }
    setError(false);

    // Patient's object
    const patientObject = {
      petName,
      ownerName,
      email,
      date,
      symptoms,
    };

    if (patient.id) {
      // Edit record
      patientObject.id = patient.id;
      const updatedPatients = patients.map((patientState) => {
        return patientState.id === patient.id ? patientObject : patientState;
      });
      setPatients(updatedPatients);
      setPatient({});
    } else {
      // New record
      patientObject.id = generateId();
      setPatients([...patients, patientObject]);
    }

    // Reset Form
    setPetName("");
    setOwnerName("");
    setEmail("");
    setDate("");
    setSymptoms("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-3">
      <h2 className="font-black text-3xl text-center">Patients follow-up</h2>
      <p className="text-lg mt-5 mb-10 text-center">
        Add patients and{" "}
        <span className="text-indigo-600 font-bold">manage them</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error && (
          <Error>
            <p>All fields are required</p>
          </Error>
        )}
        <div className="mb-5">
          <label
            htmlFor="pet"
            className="block text-gray-700 uppercase font-bold"
          >
            Pet's name
          </label>
          <input
            id="pet"
            type="text"
            placeholder="Enter the pet's name"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="owner"
            className="block text-gray-700 uppercase font-bold"
          >
            Owner's name
          </label>
          <input
            id="owner"
            type="text"
            placeholder="Write the owner's name"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your contact email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="register"
            className="block text-gray-700 uppercase font-bold"
          >
            Register
          </label>
          <input
            id="register"
            type="date"
            placeholder="Pick the register date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="symptoms"
            className="block text-gray-700 uppercase font-bold"
          >
            Symptoms
          </label>
          <textarea
            id="symptoms"
            cols="30"
            placeholder="Describe the symptoms"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="w-full text-white p-3 uppercase font-bold cursor-pointer transition-all rounded-sm bg-indigo-600 hover:bg-indigo-500"
          value={patient.id ? "Edit patient" : "Add patient"}
        />
      </form>
    </div>
  );
};

export default Form;
