"use client"
import React, { useEffect , useState} from 'react'
 
const UniqueWebPage = (props:any)=> {


    const [dom,setDom] = useState<any>("");
    const getDOMString = async() =>{
        try {
            const linkKey = props?.params?.slug
            const data = {
                "linkKey":linkKey,
            }

            // console.log(data , "this is a data");
            
            const res = await fetch("http://localhost:5000/api/v1/getDOM",{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            
            const apiRepsonse = await res.json();
                // console.log("this is DOM RESPONSE", apiRepsonse.data);
                // console.log(apiRepsonse.body,"lol");
                setDom(apiRepsonse.data);
                // console.log(dom,"this is dom log");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getDOMString();
    },[])

    return (
        <>
         <div dangerouslySetInnerHTML={{ __html: dom }} />
        <h1>HI ALL, {props?.params?.slug}</h1>
        </>


    )
}

export default UniqueWebPage;