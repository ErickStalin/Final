const mongoose = require("mongoose");
const Paciente = require("../../models/Paciente");

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

describe("Modelo de Paciente", () => {
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

  test("Guardar un paciente válido", async () => {
    const pacienteData = {
      nombre: "Ejemplo",
      edad: 5,
      especie: "Perro",
    };

    const paciente = new Paciente(pacienteData);
    const pacienteGuardado = await paciente.save();

    expect(pacienteGuardado._id).toBeDefined();
    expect(pacienteGuardado.nombre).toBe(pacienteData.nombre);
    expect(pacienteGuardado.edad).toBe(pacienteData.edad);
    expect(pacienteGuardado.especie).toBe(pacienteData.especie);
  }, 60000);
});
