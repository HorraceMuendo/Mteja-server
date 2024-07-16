const { Pool } = require('pg')

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "",
    database: "clubnexa",
    port: 5423
});

module.exports = (
    pool
)