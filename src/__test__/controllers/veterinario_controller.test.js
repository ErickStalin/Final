const mongoose = require("mongoose");
const Veterinario = require("../../models/Veterinario");
const { mockRequest, mockResponse } = require("express");

// Antes de todas las pruebas, establece una conexión a la base de datos y aumenta el tiempo de espera
beforeAll(async () => {
  await mongoose.connect(
    "mongodb://localhost/testdb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    60000
  ); // Aumenta el tiempo de espera a 60 segundos
});

// Después de todas las pruebas, desconéctate de la base de datos
afterAll(async () => {
  await mongoose.disconnect();
});

describe("Controlador de Veterinarios", () => {
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

  test("Registro exitoso de veterinario", async () => {
    const req = mockRequest({
      nombre: "Nombre",
      apellido: "Apellido",
      // Agrega más datos de prueba según sea necesario
    });
    const res = mockResponse();

    // Llama a la función del controlador para el registro de un veterinario
    await registrarVeterinario(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // Agrega más expectativas aquí según sea necesario
  }, 60000);

  test("Inicio de sesión exitoso de veterinario", async () => {
    // Supongamos que tienes un veterinario ficticio en tu base de datos
    const veterinarioFicticio = new Veterinario({
      nombre: "VeterinarioFicticio",
      apellido: "ApellidoFicticio",
      // Agrega más datos de prueba según sea necesario
    });
    await veterinarioFicticio.save();

    const req = mockRequest({
      nombre: "VeterinarioFicticio",
      // Agrega más datos de prueba según sea necesario
    });
    const res = mockResponse();

    // Llama a la función del controlador para iniciar sesión del veterinario
    await iniciarSesionVeterinario(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // Agrega más expectativas aquí según sea necesario
  }, 60000);

  // Agrega más pruebas aquí según sea necesario
});
