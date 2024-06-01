import React, { useState } from "react";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import { skills } from "../../data/skills";
const animatedComponents = makeAnimated();

export default function TechBox({ techskills, setTechSkills }) {
  const handleChanges = (selectedOptions) => {
    setTechSkills(selectedOptions);
  };
  const dot = (color = "#ddf7e9") => ({
    alignItems: "center",
    display: "flex",
    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles = {
    placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
    input: (styles) => ({ ...styles, ...dot() }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: isSelected ? "#1fc76a" : isFocused ? "#ddf7e9" : null,
        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? "#1fc76a"
              : "#ddf7e9"
            : undefined,
        },
      };
    },
    control: (styles, { isFocused }) => ({
      ...styles,
      borderColor: isFocused ? "#1fc76a" : "#ccc",
      boxShadow: isFocused ? "0 0 0 1px #1fc76a" : null,
      "&:hover": {
        borderColor: isFocused ? "#1fc76a" : "#ccc",
      },
    }),
  };

  const CustomOption = (props) => {
    return (
      <components.Option {...props}>
        {props.data.label}
        <span className="ml-auto text-[#1fc76a] font-bold text-[26px] cursor-pointer pl-3">
          +
        </span>
      </components.Option>
    );
  };

  return (
    <Select
      styles={colourStyles}
      maxMenuHeight={200}
      components={{ ...animatedComponents, Option: CustomOption }}
      isMulti
      options={skills}
      onChange={handleChanges}
      closeMenuOnSelect={false}
    />
  );
}
