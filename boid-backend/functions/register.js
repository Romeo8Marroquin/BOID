const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = async ({body}) => {
    const { username, email, password } = JSON.parse(body);

    if (!username || !email || !password) return {
        statusCode: 400,
        body: JSON.stringify({ok: false, message: 'Los parámetros no son válidos'})
    }

    try {
        let users = await User.find({username});

        if (users.length > 0) return {
        statusCode: 400,
        body: JSON.stringify({ok: false, message: 'No se pudo registrar el usuario'})
        }

        users = await User.find({email});

        if (users.length > 0) return {
        statusCode: 400,
        body: JSON.stringify({ok: false, message: 'No se pudo registrar el usuario'})
        }

        const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT));
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({ username, email, password: hash, created: new Date() });
        let saved = false;
        await newUser.save().then(() => {
        saved = true;
        }).catch(err => {
        console.log(err);
        });

        if (saved) {
        return {
            statusCode: 200,
            body: JSON.stringify({ok: true, message: 'Usuario registrado correctamente'})
        }
        } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ok: false, message: 'No se pudo registrar el usuario'})
        }
        }
    } catch (error) {
        console.log(error);
    }
};