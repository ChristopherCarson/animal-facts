import React, { useState, useEffect, useCallback } from 'react';
import { Dropdown, DropdownButton, Card } from 'react-bootstrap';

const Home = () => {
  const [facts, setFacts] = useState({});
  const [animal, setAnimal] = useState('cat');
  const [count, setCount] = useState(1);
  const proxyUrl = 'https://codeblooded-cors-anywhere.herokuapp.com/';

  const fetchData = useCallback(async () => {
    const res = await fetch(
      proxyUrl +
        `https://cat-fact.herokuapp.com/facts/random?animal_type=${animal}&amount=${count}`
    );
    res
      .json()
      .then((res) => setFacts(res))
      .catch((err) => console.log('ERROR', ' ', err));
  }, [count, animal]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ textAlign: 'center', margin: 'auto' }}>
      <Card style={{ width: '50%', margin: 'auto', marginTop: 200 }}>
        <div style={{ margin: 'auto', display: 'inline-block' }}>
          Choose your animal here:
          <DropdownButton id="dropdown-basic-button" title={animal}>
            <Dropdown.Item as="button" onClick={() => setAnimal('cat')}>
              cat
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => setAnimal('dog')}>
              dog
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => setAnimal('horse')}>
              horse
            </Dropdown.Item>
          </DropdownButton>
          Enter the number of facts you want here:
          <br />
          <input
            min={1}
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            step="any"
          />
        </div>
        <br />
        <h4>Prepare to have your mind blown here:</h4>
        <div style={{ paddingLeft: 30, paddingRight: 30, textAlign: 'left' }}>
          {facts.length > 1 ? (
            facts.map((fact, i) => (
              <h6 key={`fact-${i}`}>{`${i + 1}) ${JSON.stringify(
                fact.text
              )}`}</h6>
            ))
          ) : facts.text !== undefined ? (
            <h6>{`1) ${JSON.stringify(facts.text)}`}</h6>
          ) : null}
        </div>
      </Card>
    </div>
  );
};
export default Home;
