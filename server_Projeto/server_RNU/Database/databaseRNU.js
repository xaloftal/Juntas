const pg = require('pg');
const Pool = pg.Pool

const connectionString = 'postgresql://postgres:F6wgLAAchg0GJRqb@db.icgjzmmydqtmvptiutsh.supabase.co:5432/rnu';

const pool = new Pool({
  connectionString,
});

module.exports = pool ;