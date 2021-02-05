import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={searchSubmitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Product...'
        className='mt-2 mb-2 mt-md-0 mb-md-0'
      ></Form.Control>

      <Button variant='outline-success' type='submit' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
