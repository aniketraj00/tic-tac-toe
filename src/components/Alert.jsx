import './Alert.css'

const Alert = ({isVisible, message, onClose}) => {
    return (
        <div className={`alert ${isVisible ? 'show' : ''}`}>
            <div className="alert-inner">
                <p className='alert-times' onClick={onClose}>&times;</p>
                <p className='alert-msg'>{message}</p>
            </div>
        </div>
    )
}

export default Alert