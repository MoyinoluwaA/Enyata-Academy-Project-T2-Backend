/* eslint-disable camelcase */
const { successResponse } = require('../utils/successResponse')
const { cloudinaryConfig, uploader } = require('../utils/cloudinary')

cloudinaryConfig()
module.exports = async (req, res, next) => {
	try {
		const { data, file } = req
		// Upload image to cloudinary
		const {
			public_id, format, original_filename, url, secure_url,
		} = await uploader.upload(data.content, {
			folder: 'enyata/academy/',
			use_filename: true,
			filename_override: file.originalname,
			resource_type: 'auto',
			allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx'],
		})

		successResponse(
			res,
			'File uploaded successfully',
			{
				public_id, format, original_filename, url, secure_url,
			},
		)
	} catch (err) {
		next(err)
	}
}
