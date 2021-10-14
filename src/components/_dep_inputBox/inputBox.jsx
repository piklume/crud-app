
const InputBox = ({ id, type, placeholder, value, handelChange,handleKeyPress }) => {

    return (
        <div className='input-box'>
            <input
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={handelChange}
                onKeyPress={handleKeyPress}
            />
        </div>
    )
}

export default InputBox;