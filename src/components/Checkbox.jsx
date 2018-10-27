import React from 'react'
import cn from 'classnames'

import './Checkbox.scss'

function Checkbox({ className, type, children, ...props }) {
  return (
    <label className="checkbox-label">
      <input type="checkbox" {...props} className={cn(className, 'checkbox')} />
      <span className="label">{children}</span>
    </label>
  )
}

export default Checkbox
