"use client"
import React, { useEffect , useState , useRef} from 'react'

const UniqueWebPage = (props:any)=> {

    const elementRef = useRef(null);
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
        const element = elementRef.current;
        // Remove hover styles
        element.style.pointerEvents = 'none';

        // Remove hover event handlers
        element.onmouseover = null;
        element.onmouseout = null;

        // Add any additional styles or event handlers you want
        element.style.cursor = 'default';
        getDOMString();
    },[])

    return (
        <>
         <div
         ref={elementRef}
         dangerouslySetInnerHTML={{ __html: dom }} />
        </>


    )
}

export default UniqueWebPage;
