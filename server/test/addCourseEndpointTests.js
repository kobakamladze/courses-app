import Mocha from 'mocha';
import chai from 'chai';
import axios from 'axios';

chai.expect();

const PORT = process.env.PORT || 3000;
const DOMAIN = `http://localhost:${PORT}`;

describe('/add Endpoint tests', () => {
  it('POST /add', () =>
    axios
      .post(`${DOMAIN}/add`, {
        title: 'Angular',
        price: 200,
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
      })
      .then(({ data: { data: response } }) => {
        console.log('RESPONSE DATA === ' + JSON.stringify(response));
      }));
});
