import React,{ useContext } from 'react';
import './displayTable.css';

import { UserContext } from '../../provider/user.provider';

const DisplayTable = () => {

    const { userList, setUpdate,setUpdateIDToContext,deletePerson} = useContext(UserContext);
    //console.log('displayTable',userList);

    const handelClick = event => {
        if(event.target.className === 'update-button'){
            setUpdateIDToContext(Number(event.target.id));
            setUpdate(true);
        } else if (event.target.className === 'delete-button') {
            deletePerson(Number(event.target.id));
        }
    }

    return (
        <div className='display-table'>
            <h3>Data Table</h3>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      userList.map(item => 
                        <tr key={item.id} onClick={handelClick}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td><button id={item.id} className='update-button'>Update</button></td>
                            <td><button id={item.id} className='delete-button'>Delete</button></td>
                        </tr>
                        )  
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DisplayTable;