import { useEffect, useState } from "react"
import axios from 'axios';



const SearchBar = (props) => {

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("")
    const [showTable, setShowTable] = useState(false)
   

    const submitHandler = (e) => {
        e.preventDefault();
        if (from.length === 0 || to.length === 0) { alert("please enter both value") }
        else if (!(Number.isInteger(Number(from))) || !(Number.isInteger(Number(to)))) {
            alert("please enter Numeric digit only. ")
            
        }
        else {
            const range = [from, to]
            axios
                .post('http://localhost:8000/search', range)
                .then(() => {
                    console.log('data searching');
                   
                })
                .catch(err => {
                    console.error(err);

                });
            props.fetchData()
            setShowTable(true);
            props.showTable(showTable)
            setFrom("")
            setTo("")
        }
       
        
    }
   

    

    return (
        <div>
            <div style={{ margin: '10px' }}> <h5><b> Search Database By- Age</b></h5></div>
            <div className="input-group container  " >
                <div className="form-outline from " style={{ paddingRight: '10px' }}>
                    <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="From" className="form-control border border-danger rounded" />

                </div>

                <div className="form-outline to " style={{ paddingRight: '10px' }}>
                    <input type="search" value={to} onChange={(e) => setTo(e.target.value)} placeholder="To" className="form-control border border-danger rounded" />

                </div>

                <button type="button" onClick={submitHandler} className="btn btn-sm btn-success">
                    <i className="fa fa-search"></i>

                </button >
            </div>
        </div>



    )
}

export default SearchBar