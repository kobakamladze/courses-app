function emailSetUp(email) {
  return {
    to: email,
    from: 'expressCoursesApp@gmail.com',
    subject: 'Account Created!',
    text: 'SOME TEEXTTTTTTTTTTTT!!!!!!!!!!!!!',
    html: '<a href="http://localhost:3000/">Go to Courses Shop</a>',
  };
}

export default emailSetUp;
