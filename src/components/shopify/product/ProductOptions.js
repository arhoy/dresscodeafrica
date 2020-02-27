/* eslint-disable */

import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  & label {
    margin: 1rem;
  }
  & select,
  & input {
    padding: 1rem 2rem;
    width: 18rem;

    margin-right: 1rem;
  }
`;

const Option = styled.div`
  margin: 1rem 0;
`;

const Quantity = styled.div`
  margin: 1rem 0;
`;

export const ProductOptions = ({
  options,
  handleOptionChange,
  checkDisabled,
  quantity,
  handleQuantityChange,
}) => {
  return (
    <Container>
      {options.length > 0 &&
        options.map(({ id, name, values }, index) => {
          // index of the each option type ie Color, Capacity
          // name : ie(Color,Capacity)
          if (name === 'Title') {
            return null;
          } else {
            return (
              <Option key={id}>
                <label htmlFor={name}> {name} </label>
                <select
                  name={name}
                  key={id}
                  onChange={event => handleOptionChange(index, event, name)}
                >
                  {name}
                  {values.map((value, i) => (
                    <option
                      optionindex={i}
                      value={value}
                      key={`${name}-${value}`}
                      disabled={checkDisabled(name, value)}
                    >
                      {value}
                    </option>
                  ))}
                </select>
              </Option>
            );
          }
        })}
      <Quantity>
        <label htmlFor="quantity">Quantity </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          step="1"
          onChange={handleQuantityChange}
          value={quantity}
        />
      </Quantity>
    </Container>
  );
};
