function resetEmailSetup({ email, resetToken }) {
  return {
    to: email,
    from: 'expressCoursesApp@gmail.com',
    subject: 'Recover Password',
    html: `
        <h1> Change password for user with EMmail: ${email} </h1>
        <p><a>Note that link is valid for 10 minutes!</a></p>

        </hr>

        <p><a href="http://localhost:3000/auth/passwordChange/${resetToken}">Press to reset password!</a></p>
      `,
  };
}

export default resetEmailSetup;
