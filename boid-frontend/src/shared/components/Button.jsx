import './Button.css'
import PropTypes from 'prop-types'

export const Button = ({label, callback, isTitle = false}) => {
  return (
    <div className="button-principal" onClick={callback}>
      <span className={isTitle ? 'font-subtitle' : 'font-text'}>{label}</span>
    </div>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  isTitle: PropTypes.bool
}