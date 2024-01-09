const pg = require('pg');
const Pool = pg.Pool

const connectionString = 'postgresql://postgres:8dx+q>p=$V.kamR@db.icgjzmmydqtmvptiutsh.supabase.co:5432/jmai'
const connectionString2 = 'postgresql://postgres:8dx+q>p=$V.kamR@db.icgjzmmydqtmvptiutsh.supabase.co:5432/rnu'


const pool = new Pool({
  connectionString,
  connectionString2
})

module.exports = pool;

