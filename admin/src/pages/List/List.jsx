import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
    
    // const url = "http://localhost:4000";
    const [list, setList] = useState([]);

    const fetchList = async () => {
       
            await axios.get(`${url}/api/food/list`).then((res)=>{
                console.log(res.data.date)
                setList(res.data.date)
            }).catch(
                (err)=> console.log(err)
            )        
        }
    
        const removeFood = async(foodId) =>{
            const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
            await fetchList();
            if(response.data.success){
                toast.success(response.data.message)
            }
            else{
                toast.error("Error");
            }
        }


    useEffect(() => {
        fetchList();
    }, []);

    // useEffect(() => {
    //     console.log('List State:', list);
    // }, [list]);

    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>

                {list.length > 0 ? (
                    list.map((item, index) => (
                        <div key={index} className='list-table-format'>
                            <img src={`${url}/images/` + item.image} alt={item.name} />
                            <p>{item.category}</p>
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
                        </div>
                    ))
                ) : (
                    <p>No items available</p>
                )}
            </div>
        </div>
    );
};

export default List;
