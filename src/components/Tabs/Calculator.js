import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function Calculator() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('add');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://your-heroku-app.herokuapp.com/${operator}?num1=${num1}&num2=${num2}`);
    const data = await response.json();

    setResult(data.result);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First Number</Form.Label>
          <Form.Control type="number" value={num1} onChange={(e) => setNum1(parseFloat(e.target.value))} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Second Number</Form.Label>
          <Form.Control type="number" value={num2} onChange={(e) => setNum2(parseFloat(e.target.value))} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Operator</Form.Label>
          <Form.Control as="select" value={operator} onChange={(e) => setOperator(e.target.value)}>
            <option value="add">+</option>
            <option value="subtract">-</option>
            <option value="multiply">*</option>
          </Form.Control>
        </Form.Group>
        <br></br>
        <Button type="submit">Calculate</Button>
      </Form>
      {result !== null && (
        <p>The result of {num1} {operator} {num2} is {result}</p>
      )}
    </div>
  );
}
