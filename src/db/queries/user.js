module.exports = {
  
    // Creates the user table
	createUserTable: `
		DO $$
		BEGIN
		IF NOT EXISTS ( SELECT 1 FROM pg_type WHERE typname = 'user_role' ) THEN
			CREATE TYPE user_role AS ENUM ('admin', 'user');
		END IF;
		END
		$$;
		CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			first_name VARCHAR NOT NULL,
			last_name VARCHAR NOT NULL,
			email VARCHAR NOT NULL UNIQUE,
			phone VARCHAR NOT NULL UNIQUE,
			password VARCHAR NOT NULL,
			date_of_birth DATE,
			address VARCHAR,
			university VARCHAR,
			course VARCHAR,
			cgpa NUMERIC,
			cv VARCHAR,
			picture VARCHAR,
			role user_role DEFAULT 'user',
			created_at TIMESTAMPTZ DEFAULT NOW(),
			updated_at TIMESTAMPTZ DEFAULT NOW()
		);  
	`,
			
	addUser: `
        INSERT INTO users(
            first_name,
            last_name,
            email,
			phone,
            password
        ) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `,

	getUser: `
        SELECT *
        FROM users
        WHERE email=$1
    `,
};
