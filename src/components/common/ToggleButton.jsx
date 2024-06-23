import React, { useState } from "react";
import { styled } from "styled-components";

const ToggleButton = ({ chartType, onToggle }) => {
  console.log("chartType", chartType);
  const toggleHandler = () => {
    onToggle();
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="toggle-switch">
          <input
            type="checkbox"
            className="checkbox"
            name={"chart"}
            id={"chart"}
            onChange={toggleHandler}
          />
          <label className="label" htmlFor={"chart"}>
            <span className="inner" />
            <span className="switch" />
          </label>
        </div>
      </div>
    </Wrapper>
  );
};

export default ToggleButton;

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 0;

  .container {
    text-align: center;
  }
  .toggle-switch {
    position: relative;
    width: 75px;
    display: inline-block;
    text-align: left;
  }
  .checkbox {
    display: none;
  }
  .label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 0 solid #bbb;
    border-radius: 20px;
  }
  .inner {
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
  }
  .inner:before,
  .inner:after {
    float: left;
    width: 50%;
    height: 32px;
    padding: 0;
    line-height: 36px;
    color: #fff;
    font-weight: bold;
    box-sizing: border-box;
  }
  .inner:before {
    content: "캔들";
    padding-left: 10px;
    background-color: #9e9292;
    color: #fff;
  }
  .inner:after {
    content: "선";
    padding-right: 20px;
    background-color: #728196;
    color: #fff;
    text-align: right;
  }
  .switch {
    display: block;
    width: 22px;
    margin: 5px;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 43px;
    border: 0 solid #bbb;
    border-radius: 20px;
    transition: all 0.3s ease-in 0s;
  }
  .checkbox:checked + .label .inner {
    margin-left: 0;
  }
  .checkbox:checked + .label .switch {
    right: 0px;
  }
`;
