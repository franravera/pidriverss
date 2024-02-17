import style from './Form.module.css';
import { useState } from "react";
import { useSelector } from 'react-redux';
import validate from './validate';
import { getTeams, createDriver } from '../../../redux/actions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";


const Form = () => {

    const allTeams = useSelector((state) => state.allTeams);    
    const drivers = useSelector((state) => state.allDrivers)
    const dispatch = useDispatch();

    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getTeams())        
    },[])
    

    const [form, setForm] = useState({
        name:'',
        surname:'',
        nationality:'',
        image:'',
        birth:'',
        description:'',
        teams:[]        
    })

    const [errors, setErrors] = useState({
      name:'',
      surname:'',
      nationality:'',
      image:'',
      birth:'',
      description:'',
      teams:[]       
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const exist = drivers.find(n=>n.name === form.name)
        if (exist){
            alert('That driver already exists!')
        } else {
            dispatch(createDriver(form));
            
            setForm({
              name:'',
              surname:'',
              nationality:'',
              image:'',
              birth:'',
              description:'',
              teams:[]                    
                });
                alert('Driver created!')
        }
        navigate('/home')
    };

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setForm({
            ...form,
            [property]:value
        })
        setErrors(validate({
            ...form,
            [property]: value,
        }))
        console.log(form.released);
    };

    const handleTeams = (e) => {
        const selectedTeam = e.target.value;
        setForm(prevForm => ({
            ...prevForm,
            teams: [...prevForm.teams, selectedTeam]
        }));
    };
    
    const handleDelete = (teamToDelete) => {
        setForm(prevForm => ({
            ...prevForm,
            teams: prevForm.teams.filter(team => team !== teamToDelete)
        }));
    };

    

    const emptyErrors = Object.keys(errors).length===0; //tomo las propoiedades de errors y las introduzco en unn array para aplicar.length

    return(
        <div className={style.background}>
        <form onSubmit={(e) => handleSubmit(e)} className={style.form}>

            

        <div className={style.fullcont}>

            <div className={style.title}>
                <h2>CREATE YOUR DRIVER</h2>
            </div>
            
            <div className={style.cont}>
                <label className={style.label}>Name:</label>
                <input placeholder="write driver's name..." type="text" value={form.name} onChange={(e)=>handleChange(e)} name='name' className={style.input}/>
                {errors.name && <p className={style.errors}>{errors.name}</p>}
            </div>

            <div className={style.cont}>
                <label className={style.label}>Surname:</label>
                <input placeholder="write driver's surname.." type="text" value={form.surname} onChange={(e)=>handleChange(e)} name='surname' className={style.input}/>
                {errors.surname && <p className={style.errors}>{errors.surname}</p>}
            </div>
            
            <div className={style.cont}>
                <label className={style.label}>Nationality:</label>
                <input placeholder="write driver's nationality..." type="text" value={form.nationality} onChange={(e)=>handleChange(e)} name='nationality' className={style.input}/>
                {errors.nationality && <p className={style.errors}>{errors.nationality}</p>}
            </div>

            <div className={style.cont}>
                <label  className={style.label}>Image URL:</label>
                <input type='text' value={form.image} onChange={(e)=>handleChange(e)} name='image'/>                
                {/* <img src={form.image} alt={form.name} className={style.image}/> */}
            </div>

            <div className={style.cont}>
                <label className={style.label}>Birth:</label>
                <input type="date" value={form.released} onChange={(e)=>handleChange(e)} name='birth' className={style.input}/>
                {errors.birth && <p className={style.errors}>{errors.birth}</p>}
            </div>

            <div className={style.cont}>
                <label className={style.label}>Description:</label>
                <textarea placeholder="write driver's description..." type="text" value={form.description} onChange={handleChange} name='description' className={style.input}/>
                {errors.description && <p className={style.errors}>{errors.description}</p>}
            </div>

            <div className={style.cont}>
                <select className={style.select} id='teams' defaultValue='' onChange={(e)=>handleTeams(e)}>
                    <option className={style.option} value='' disabled hidden>Choose your teams...</option>
                    {allTeams.map((t)=>{
                        return(
                            <option className={style.option} key={t.id} value={t.name}>{t.name}</option>
                        )
                    })                        
                    }
                </select>
                {form.teams.map((t)=>(
                    <div className={style.boxopcion}>
                        <div className={style.opciontitle}>{t}</div>
                        <button className={style.buttonx} onClick={()=>handleDelete(t)} value={t} key={t}><span className={style.x}>X</span></button>                                               
                    </div>
                    ))                    
                }
                {errors.teams && <p className={style.errors}>{errors.teams}</p>} 
            </div>                  
           

            

            {emptyErrors && <button type="submit" className={style.button}>New Driver</button>}
        </div>
           
        </form>
        </div>
    )
};

export default Form;