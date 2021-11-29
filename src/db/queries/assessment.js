module.exports = {
	/**
   * @description Creates the assessment table
   */
	createAssessmentTable: `
			DO $$
			BEGIN
			IF NOT EXISTS ( SELECT 1 FROM pg_type WHERE typname = 'assessment_status' ) THEN
				CREATE TYPE assessment_status AS ENUM ('taken', 'in progress', 'pending');
			END IF;

			END
			$$;

			CREATE TABLE IF NOT EXISTS assessments (
				id SERIAL PRIMARY KEY,
				batch_id INT NOT NULL,
				assessment_test JSON NOT NULL,
				start_date DATE NOT NULL,
				closing_date DATE NOT NULL,
				time_allotted INTEGER NOT NULL,
				status assessment_status NOT NULL DEFAULT 'pending',
				created_at TIMESTAMPTZ DEFAULT NOW(),
				updated_at TIMESTAMPTZ DEFAULT NOW(),
				FOREIGN KEY (batch_id) REFERENCES applications (id)
			);  
	`,

	/**
	 * @description Adds a new assessment to the database
	 * @returns {<Promise>} A promise that resolves to the newly created assessment
	 */
	addAssessment: `
		INSERT INTO assessments (
			batch_id,  
			assessment_test, 
			start_date, 
			closing_date, 
			time_allotted
		)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING *;
	`,

	/**
	* @description Gets assessment for batch from assessment table table
	* @param {string} batch_id - the unique id of a batch(ie application)
	*/
	getAssessmentByBatch: `
        SELECT *
        FROM assessments
        WHERE batch_id=$1
    `,
}
