# Adoptme | Programación Backend III — Entrega 1

**Estudiante:** Ivanna Micaela Arzamendia
**Comisión:** 105660
**Materia:** Programación Backend III

## Descripción

Implementación del módulo de *mocking* para la API Adoptme. El proyecto parte de la estructura académica de Adoptme (modelos, DAOs, repositorios, controladores y rutas). El módulo de mocking, sus validaciones, sus pruebas y su integración fueron desarrollados para esta entrega.

## Requisitos

- Node.js 20 o superior y npm.
- MongoDB local o MongoDB Atlas (solo la URL de conexión en `.env`).

## Instalación

```bash
npm ci
```

Copiar `.env.example` como `.env` y configurar la conexión MongoDB:

```env
PORT=8080
MONGO_URI=mongodb://127.0.0.1:27017/adoptme_entrega1
```

Ejecutar:

```bash
npm run dev
```

## Endpoints requeridos

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/mocks/mockingpets` | Genera mascotas ficticias en memoria (50 por defecto). |
| GET | `/api/mocks/mockingusers` | Genera 50 usuarios ficticios en memoria. |
| POST | `/api/mocks/generateData` | Genera e inserta usuarios y mascotas en MongoDB. |
| GET | `/api/users` | Consulta los usuarios guardados. |
| GET | `/api/pets` | Consulta las mascotas guardadas. |

Los GET de mocking aceptan `?quantity=3` como cantidad opcional. Los usuarios incluyen `_id` con formato MongoDB, `__v`, `first_name`, `last_name`, `email`, `password` (hash bcrypt de `coder123`), `role` (`user` o `admin`) y `pets: []`.

El POST recibe un JSON con **números**, por ejemplo:

```json
{ "users": 10, "pets": 5 }
```

Responde HTTP **201** y las cantidades insertadas:

```json
{ "status": "success", "payload": { "users": 10, "pets": 5 } }
```

**Importante:** `GET /mockingusers` y `GET /mockingpets` no modifican la base de datos. Solamente `POST /generateData` inserta registros. Cada vez que ejecutás el POST, se agregan nuevos documentos; usá una base de datos de prueba.

## Verificación de la entrega

1. Iniciar MongoDB y el servidor.
2. Consultar `GET /api/mocks/mockingusers` y comprobar que hay exactamente 50 usuarios, roles válidos, `pets: []` y hashes de contraseña.
3. Consultar `GET /api/mocks/mockingpets?quantity=5` y verificar cinco mascotas.
4. Enviar `POST /api/mocks/generateData` con `{ "users": 10, "pets": 5 }`.
5. Consultar `GET /api/users` y `GET /api/pets` para comprobar los registros persistidos.
6. Probar un POST con cantidades inválidas: debe devolver HTTP 400.

Podés usar Insomnia, Thunder Client o el archivo `PETICIONES.http` incluido.

## Pruebas automatizadas

```bash
npm test
```

Las pruebas verifican validaciones, el formato de los 50 usuarios, que la contraseña se haya hasheado correctamente y los endpoints de mocking sin escribir en MongoDB. **La persistencia real se comprueba con MongoDB ejecutándose y las solicitudes GET y POST anteriores.**

## Organización del módulo agregado

```text
src/
  routes/mocks.router.js            # Endpoints y métodos HTTP
  controllers/mocks.controller.js   # Validación y respuestas
  mocks/mock.generator.js          # Datos falsos con Faker y bcrypt
  services/mocks.service.js        # Inserción usando servicios existentes
  utils/mockQuantity.js            # Validación reutilizable
  dao/Users.dao.js                 # Inserción múltiple de usuarios
  dao/Pets.dao.js                  # Inserción múltiple de mascotas
  repository/GenericRepository.js # Método createMany
test/                              # Tests de mocking
PETICIONES.http                    # Consultas manuales
```

## Buenas prácticas

- La conexión a MongoDB se configura por `.env` (no se sube a GitHub).
- Las contraseñas se almacenan con **bcrypt**. Los endpoints existentes de consulta de usuarios omiten el campo `password`.
- Se limita la cantidad a **0–1000** por tipo para evitar entradas arbitrariamente grandes.
- Se usan los DAOs y repositorios existentes para insertar los registros; no se conecta a Mongo desde el router.
- Se devuelven estados HTTP adecuados, sin exponer errores internos.
- Se excluyen `node_modules`, `.env` y logs del control de versiones.

> **Solo para aprendizaje:** los endpoints de mocking no incluyen autorización porque la consigna solicita generarlos mediante API. No se deben exponer públicamente en un servidor de producción, especialmente cuando pueden generar usuarios `admin`.

**Nota sobre persistencia:** las inserciones en usuarios y mascotas son operaciones separadas, no una transacción atómica. Se evita agregar complejidad de transacciones MongoDB porque no es parte de la entrega.

## Origen del código

Base de proyecto: carpeta `coderBack3_105660-adoptme-raw` compartida en el material de Martín, basada en la plantilla educativa **RecursosBackend-Adoptme** de CoderHouse. El código base de usuarios, mascotas, sesiones y adopciones se conserva como referencia; el módulo de mocking de esta entrega está desarrollado de forma independiente y documentado aquí.
