// Modelo: representa la entidad Producto y sus reglas básicas
class Producto {
  constructor({ id, nombre, descripcion = null, precio, stock = 0, creado_en }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.creadoEn = creado_en;
  }

  // Convierte una fila de MySQL en un objeto Producto
  static fromRow(row) {
    return new Producto({
      ...row,
      precio: Number(row.precio), // mysql2 devuelve DECIMAL como texto
    });
  }

  // Devuelve un arreglo de errores; vacío si los datos son válidos
  static validar(datos) {
    const errores = [];
    const { nombre, descripcion, precio, stock } = datos;

    if (typeof nombre !== 'string' || nombre.trim() === '') {
      errores.push('nombre es obligatorio');
    } else if (nombre.length > 100) {
      errores.push('nombre no debe superar 100 caracteres');
    }
    if (descripcion !== undefined && descripcion !== null && typeof descripcion !== 'string') {
      errores.push('descripcion debe ser texto');
    }
    if (typeof precio !== 'number' || precio <= 0) {
      errores.push('precio debe ser un número mayor a 0');
    }
    if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
      errores.push('stock debe ser un entero mayor o igual a 0');
    }
    return errores;
  }
}

module.exports = Producto;
