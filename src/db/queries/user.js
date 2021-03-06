module.exports = {
	/**
   * @description Creates the user table
   */
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
				country VARCHAR,
				university VARCHAR,
				course VARCHAR,
				cgpa NUMERIC,
				cv JSON,
				picture JSON,
				is_verified BOOLEAN DEFAULT false,
				role user_role DEFAULT 'user',
				created_at TIMESTAMPTZ DEFAULT NOW(),
				updated_at TIMESTAMPTZ DEFAULT NOW()
			);  
	`,

	/**
   * @description Inserts data into the user table
   */
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

	/**
	* @description Gets a user by email from user table
	* @param {string} email - the email of the user
	*/
	getUserByEmail: `
        SELECT *
        FROM users
        WHERE email=$1
    `,

	/**
	* @description Gets a user by phone from user table
	* @param {string} phone - the phone number of the user
	*/
	getUserByPhone: `
        SELECT *
        FROM users
        WHERE phone=$1
    `,

	/**
	 * @description seeds an admin user
	 */
	seedAdmin: `
		INSERT INTO users(
			first_name,
			last_name,
			email,
			phone,
			password,
			role,
			is_verified
		)
		VALUES ($1, $2, $3, $4, $5, 'admin', true)
		RETURNING *
	`,

	/**
	 * @description delete a user using their email
	 * @param {string} email - the email of the user
	 */
	deleteUser: `
		DELETE FROM users
		WHERE email=$1
	`,

	/**
	 * @description update a user password using their email
	 * @param {string} email - the email of the user
	 * @param {string} password - the new password
	 * @returns {<promise>} user - the updated user
	 */
	updatePassword: `
		UPDATE users
		SET password=$1
		WHERE email=$2
		RETURNING *
	`,

	/**
	 * @description update a user details using their id
	 * @param {string} id - the id of the user
	 * @param {string} address - the user address
	 * @param {string} university - the user university
	 * @param {string} course - the user course
	 * @param {string} cgpa - the user cgpa
	 * @param {json} cv - the user cv
	 * @param {json} picture - the user picture
	 * @returns {<promise>} user - the updated user
	 */
	updateUser: `
		UPDATE users
		SET 
			date_of_birth=$1,
			address=$2,
			university=$3,
			course=$4,
			cgpa=$5,
			cv=$6,
			picture=$7
		WHERE id=$8
		RETURNING *
 	`,

	/**
	 * @description update a admin details using their id
	 * @param {string} id - the id of the admin
	 * @param {json} picture - the picture of the admin
	 * @param {string} first_name - the first name of the admin
	 * @param {string} last_name - the last name of the admin
	 * @param {string} email - the email of the admin
	 * @param {string} phone - the phone number of the admin
	 * @param {string} address - the admin address
	 * @param {string} country - the admin country
	 * @returns {<promise>} user - the updated admin
	 */
	updateAdmin: `
		UPDATE users
		SET
			picture=$1,
			first_name=$2,
			last_name=$3,
			email=$4,
			phone=$5,
			address=$6,
			country=$7
		WHERE id=$8
		RETURNING *
	`,

	/**
	 * @description verify a user using their email
	 * @param {string} email - the email of the user
	 * @returns {<promise>} user - the updated user
	 */
	verifyUser: `
		UPDATE users
		SET is_verified=true
		WHERE email=$1
		RETURNING *	
	`,
}
