const zod = require ('zod');

const userSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
    .min(8,'password must be 8 character')
    .regex(/[!@#$%^&*(),.?":{}|<>]/,
    'Password must contain at least one special character'),

})
 module.exports = userSchema;