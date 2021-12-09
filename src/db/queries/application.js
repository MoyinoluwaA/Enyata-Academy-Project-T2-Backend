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
        WHERE id=$1
    `,

	/**
   * @description Get latest application
   */
	getLastApplication: `
        SELECT * 
        FROM applications 
        WHERE id=(SELECT max(id) FROM applications)
    `,

	getBatchDetails: `
        SELECT applications.instructions, assessments.start_date
        FROM applications
        LEFT JOIN assessments ON applications.id = assessments.batch_id
        WHERE applications.id=$1
    `,

	/**
     * @description Get application stats
     * @returns {string} - query
     */
	getApplicationStats: `
        SELECT applications.batch_id, applications.start_date, COUNT(applicants.id) as student_count
        FROM applications
        LEFT JOIN applicants ON applications.id = applicants.batch_id
        GROUP BY applications.id, applicants.batch_id
        ORDER BY applications.id
    `,
}
