import React from 'react'

export const InfoItem = ({props}) =>
  props.value ? <li>
                  <label>{props.label}:</label>
                  {props.inline ? <span> {props.value}</span>
                                : <p>{props.value}</p>}
                </li>
              : null
