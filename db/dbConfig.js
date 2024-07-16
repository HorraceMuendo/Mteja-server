const { Pool } = require('pg')

const pool = new Pool({
    host: "",
    user: "",
    password: "",
    database: "",
    port: 5423
});

module.exports = (
    pool
)