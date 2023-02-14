import { Schema, model } from "mongoose";
// MongoDB a diferencia de base de datos relacionales se graba en objetos.

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio'],
    },

    imagen: {
        type: String,
    },

    rol: {
        type: String,
        required: true,
        // Si le dejo la enum, me va a dar error al tratar de utilizar un valor distinto como rol.
        // enum: ['ADMIN_ROLE', 'USER_ROLE'], // Validación para que el rol sea uno de estos dos
    },

    estado: {
        type: Boolean,
        default: true,
    },

    google: {
        type: Boolean,
        default: false,
    },
});

// Estoy sobreescribiendo el método toJSON para que mi api no retorne ni la password ni __v, pero si se almacenen en la BD.

// Aquí debe ser una función normal sino no va a funcionar pues usare el objeto this, y una función de flecha mantiene a lo que apunta el this fuera de la misma.
usuarioSchema.methods.toJSON = function() {
    // Esto genera una instancia pero con sus valores respectivos, por lo que se puede desestructurar. Como si fuese un objeto literal de js
    // Con esto separo el __v y la password del resto de las propiedades del objeto literal de js.
    const { __v, password, ...usuario } = this.toObject();
    return usuario;

}

// Create a new model of user. Debe estar en singular Usuario y no Usuarios.
const Usuario = model('Usuario', usuarioSchema)

export { Usuario };