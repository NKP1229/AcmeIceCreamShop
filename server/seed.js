const pg = require("pg");
const client = new pg.Client("postgres://localhost/acme_icecream");
const init = async (req, res) => {
  try {
    await client.connect();
    const SQL = `
            DROP TABLE IF EXISTS flavors;
            CREATE TABLE flavors(
                id SERIAL PRIMARY KEY,
                name VARCHAR(50),
                is_favorite BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now()
            );
            INSERT INTO flavors(name, is_favorite) VALUES ('Chocolate', true);
            INSERT INTO flavors(name) VALUES ('Vanilla');
            INSERT INTO flavors(name) VALUES ('Mint Chocolate Chip');
            INSERT INTO flavors(name) VALUES ('Coffee');
      `;
    await client.query(SQL);
    console.log("seeded");
    await client.end();
  } catch (error) {
    console.error(error);
  }
};
init();
