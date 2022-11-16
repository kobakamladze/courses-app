function emialSetUp(to) {
  return {
    to,
    from: 'courses-app@email.com',
    subject: 'Account Created!',
    text: 'SOME TEEXTTTTTTTTTTTT!!!!!!!!!!!!!',
    html: '<a href="http://localhost:3000/">Go to Courses Shop</a>',
  };
}

export default emialSetUp;
