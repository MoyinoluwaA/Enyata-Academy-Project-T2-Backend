exports.forgotPasswordHTML = (firstName, token) => `
    <div style='display: flex; flex-direction: column; align-items: center'>
      <div>
        <p>Dear ${firstName},</p>
        <p>We received a request to reset your password.</p>
        <p>Follow this link to reset your password ➡ 
        <a href="${process.env.CLIENT_URL}/reset_password?resetToken=${token}">Reset your password</a>
        </p>
        <p>If you didn’t ask to reset your password, you can ignore this email.</p>
        <p>Thanks,</p> 
        <em>Enyata Academy</em>
      </div>
    </div>
    `
