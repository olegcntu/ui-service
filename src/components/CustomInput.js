import React from 'react'

export const CustomInput = (props) => {
    const {type, name, placeholder, className, onChange} = props

    return (
        <div>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                className={`form-control ${className}`}/>
        </div>
    )
}
