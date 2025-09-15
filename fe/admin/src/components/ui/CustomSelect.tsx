"use client"
import React from "react"
import Select, { SingleValue } from "react-select"

export type Option = {
  value: string
  label: string
}

interface CustomSelectProps {
  instanceId: string
  options: Option[]
  value: Option | null
  onChange: (opt: Option | null) => void
  placeholder?: string
  className?: string
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  instanceId,
  options,
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <Select
      instanceId={instanceId}
      options={options}
      value={value}
      onChange={(opt: SingleValue<Option>) => onChange(opt)}
      placeholder={placeholder}
      className={className}
      classNamePrefix="custom-select"
      styles={{
        control: (base, state) => ({
          ...base,
          backgroundColor: "#151821",
          borderColor: state.isFocused ? "#0ea5e9" : "#2a2f3d",
          boxShadow: state.isFocused ? "0 0 0 1px #0ea5e9" : "none",
          "&:hover": { borderColor: "#0ea5e9" },
          minHeight: "40px",
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#151821",
          border: "1px solid #2a2f3d",
          zIndex: 50,
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected
            ? "#0ea5e9"
            : state.isFocused
            ? "#1e293b"
            : "transparent",
          color: state.isSelected ? "white" : "#e5e7eb",
          cursor: "pointer",
        }),
        singleValue: (base) => ({
          ...base,
          color: "white",
        }),
        placeholder: (base) => ({
          ...base,
          color: "#9ca3af",
        }),
      }}
    />
  )
}

export default CustomSelect
