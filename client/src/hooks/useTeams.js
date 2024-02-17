import axios from "axios"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useTeams =  ()=>{
    const { allTeams } = useSelector((state) => state);
const dispatch = useDispatch()

useEffect(()=>{ 
const fetchTeams = async ()=>{
    try {
       const responseBack = await axios.get("http://localhost:3001/getTeams")
       dispatch()
        
    } catch (error) {
        
    }
}
}, [dispatch] )
}