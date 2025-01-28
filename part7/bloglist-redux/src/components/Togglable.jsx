import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = ({ children, buttonLabel }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div>
        {visible && children({ toggleVisibility })}
        <button onClick={toggleVisibility}>
          {visible ? 'cancel' : buttonLabel}
        </button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  children: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable