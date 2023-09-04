const mongoose = require("mongoose");
const Paciente = require("../../models/Paciente");
const { mockRequest, mockResponse } = require("express");

// Aumenta el tiempo de espera de Jest
jest.setTimeout(30000);

describe("Controlador de Pacientes", () => {
  // Antes de cada prueba, conecta a la base de datos en memoria
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Después de cada prueba, desconecta y elimina la base de datos en memoria
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Debe obtener el detalle de un paciente", async () => {
    // Supongamos que tienes un paciente ficticio en tu base de datos
    const pacienteFicticio = new Paciente({
      nombre: "PacienteFicticio",
      edad: 3,
      especie: "Gato",
    });
    await pacienteFicticio.save();

    const req = mockRequest({
      params: { id: pacienteFicticio._id },
    });
    const res = mockResponse();

    // Llama a la función del controlador para obtener el detalle del paciente
    await obtenerDetallePaciente(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      _id: pacienteFicticio._id,
      nombre: pacienteFicticio.nombre,
      edad: pacienteFicticio.edad,
      especie: pacienteFicticio.especie,
    });
  });

  // Agrega más pruebas aquí según sea necesario
});
