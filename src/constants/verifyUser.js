exports.verifyUserEmail = (firstName, token) => `
    <div>
      <div>
        <p>Dear ${firstName},</p>
        <p>Thanks for signing up for Enyata Academy.</p>
        <p>Follow this link to verify your account ➡ 
        <a href="${process.env.CLIENT_URL}/verify?verifyToken=${token}">Verify your account</a>
        </p>
        <p>Once verified, you can log in to your account.</p>
        <p>If you did not sign up for Enyata Academy, please ignore this email.</p>
        <p>Thanks,</p> 
        <em>Enyata Academy</em>
      </div>
    </div>
    `

exports.verifiedSuccess = (firstName) => `
    <div>
        <div>
            <p>Dear ${firstName},</p>
            <p>Your account has been verified successfully.</p>
            <p>You can now <a href="${process.env.CLIENT_URL}/signin">log in<a> to your account.</p>
            <p>Thanks,</p>
            <em>Enyata Academy</em>
        </div>
    </div>
    `
