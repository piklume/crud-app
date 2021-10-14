import { useState, useEffect, useContext } from 'react';
import InputBox from '../inputBox/inputBox';
import { UserContext } from '../../provider/user.provider';

const InputForm = () => {

    const { userList, addPerson, updatePerson, isUpdate, updateID } = useContext(UserContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    
    const handelChange = event => {
        if (event.target.id === 'name') {
            setName(event.target.value);
        } else if (event.target.id === 'email') {
            setEmail(event.target.value)
        }
    }

    const handelClick = event => {
        if(isUpdate === false) {
            addPerson({name, email});
        } else {
            updatePerson({name, email}, updateID)
        }
        setName('');
        setEmail('');
    }   

    const handleKeyPress = event => {
        if (event.key === "Enter") {
            handelClick(event);
          } 
    }

    useEffect(() => {
        if (isUpdate === true) {
            const person = userList.filter(item => item.id === updateID)   
        
            if(person.length > 0) {
                setName(person[0].name);
                setEmail(person[0].email);
            }
        }
    },[updateID,isUpdate,userList])

    return (
        <div className='input-form'>
            <InputBox id='name' type='text' placeholder='Name' value={name} handelChange={handelChange} handleKeyPress={handleKeyPress} />
            <InputBox id='email' type='email' placeholder='Email' value={email} handelChange={handelChange} handleKeyPress={handleKeyPress}/>
            <button onClick={handelClick}>{isUpdate?'Update':'Add'}</button>
        </div>
    )
}

export default InputForm;