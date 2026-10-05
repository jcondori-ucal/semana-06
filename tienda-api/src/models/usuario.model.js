// Modelo: representa la entidad Usuario y sus reglas básicas
const ROLES = ['cliente', 'admin'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class Usuario {
  constructor({ id, nombre, email, rol = 'cliente', activo = true, creado_en }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.rol = rol;
    this.activo = activo;
    this.creadoEn = creado_en;
  }

  // Convierte una fila de MySQL en un objeto Usuario
  static fromRow(row) {
    return new Usuario({
      ...row,
      activo: Boolean(row.activo), // MySQL guarda BOOLEAN como 0/1
    });
  }

  // Devuelve un arreglo de errores; vacío si los datos son válidos
  static validar(datos) {
    const errores = [];
    const { nombre, email, rol, activo } = datos;

    if (typeof nombre !== 'string' || nombre.trim() === '') {
      errores.push('nombre es obligatorio');
    }
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      errores.push('email no tiene un formato válido');
    }
    if (rol !== undefined && !ROLES.includes(rol)) {
      errores.push(`rol debe ser uno de: ${ROLES.join(', ')}`);
    }
    if (activo !== undefined && typeof activo !== 'boolean') {
      errores.push('activo debe ser true o false');
    }
    return errores;
  }
}

module.exports = Usuario;
