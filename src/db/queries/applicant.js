module.exports = {
	/**
   * @description Creates the applicant table
   */
	createApplicantTable: `
        DO $$
        BEGIN
        IF NOT EXISTS ( SELECT 1 FROM pg_type WHERE typname = 'application_status' ) THEN
            CREATE TYPE application_status AS ENUM ('pending', 'approved', 'declined');
        END IF;
        END
        $$;
        
        CREATE TABLE IF NOT EXISTS applicants (
            id SERIAL PRIMARY KEY, 
            batch_id INT NOT NULL,
            user_id INT NOT NULL,
            status application_status DEFAULT 'pending',
            assessment_answers JSON,
            assessment_score INT,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW(),
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (batch_id) REFERENCES applications (id)
        );  
	`,

	/**
	* @description Get a user for a particular batch from applicant table
	* @param {integer} user_id - the unigue identifier of the user
    * @param {integer} batch_id - the unigue identifier of the batch
	*/
	getApplicantInBatch: `
        SELECT * 
        FROM applicants
        WHERE user_id=$1 AND batch_id=$2
    `,

	/**
	* @description Add applicant to applicant table
	* @param {integer} user_id - the unigue identifier of the user
    * @param {integer} batch_id - the unigue identifier of the batch
	*/
	addApplicant: `
        INSERT INTO applicants (
            user_id,
            batch_id
        ) 
        VALUES ($1, $2)
        RETURNING *
    `,

	/**
     * @description get all applicants for a particular batch
     * @param {integer} batch_id - the unigue identifier of the batch
     * @returns {<promise>} - a promise that resolves to an array of applicants
     */
	getApplicantsInBatch: `
        SELECT applicants.*, 
        users.first_name, users.last_name, users.email, users.phone, users.cv, users.picture,
        users.date_of_birth, users.address, users.cgpa, users.university, users.course
        FROM applicants
        LEFT JOIN users ON applicants.user_id = users.id
        WHERE batch_id=$1
        ORDER BY applicants.created_at DESC
        `,

	/**
     * @description - update applicant status
     * @param {string} id applicant id
     * @param {string} status applicant status
     * @returns {string} query
     */
	updateApplicantStatus: `
        UPDATE applicants
        SET status=$2, updated_at=NOW()
        WHERE id=$1
        RETURNING *
    `,

	/**
     * @description - get applicant by id
     * @param {string} id applicant id
     * @returns {string} query
     */
	getApplicantById: `
        SELECT *
        FROM applicants
        WHERE id=$1  
    `,

	/**
	 * @description Adds applicant test score to the applicant details
	 * @returns {<Promise>} A promise that resolves to the updated applicant
	 */
	addApplicantScore: `
    UPDATE applicants 
    SET
        assessment_answers=$1,
        assessment_score =$2
    WHERE batch_id=$3 AND id=$4
    RETURNING *;
`,

	/**
     * @description - get applicants stats
     * @returns {string} query
     */
	getApplicantsStats: `
        SELECT COUNT(*) as total_applicants,
        COUNT(CASE WHEN batch_id=$1 THEN 1 END) as total_applicants_in_batch,
        COUNT(DISTINCT batch_id) as total_batches
        FROM applicants
    `,
}
