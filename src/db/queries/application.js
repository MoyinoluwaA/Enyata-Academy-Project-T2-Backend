module.exports = {
	/**
   * @description Creates the application table
   */
	createApplicationTable: `
        CREATE TABLE IF NOT EXISTS applications (
            id SERIAL PRIMARY KEY, 
            batch_id VARCHAR NOT NULL UNIQUE,
            start_date DATE NOT NULL,
            closing_date DATE NOT NULL,
            application_link VARCHAR NOT NULL,
            instructions VARCHAR NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );  
	`,

	/**
   * @description Inserts data into the application table
   */
	addApplication: `
        INSERT INTO applications(
            batch_id, 
            start_date, 
            closing_date, 
            application_link,
            instructions
        ) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `,

	/**
   * @description Get application by id
   */
	getApplicationById: `
        SELECT *
        FROM applications
        WHERE batch_id=$1
    `,
}
