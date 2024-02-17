const validate = (form) => {
    const errors = {};
    
    if(!form.name){
        errors.name = 'Complete name'
    }else if(!/^[a-zA-Z0-9-() .]+$/.test(form.name)){
        errors.name = 'Only letters, numbers, - and ()'
    }else if(form.name.length<5){
        errors.name = 'Must have more than 5 characters'
    }

    if(!form.surname){
        errors.surname = 'Complete surname'
    }else if(!/^[a-zA-Z0-9-() .]+$/.test(form.surname)){
        errors.surname = 'Only letters, numbers, - and ()'
    }else if(form.surname.length<5){
        errors.surname = 'Must have more than 5 characters'
    }

    if(!form.nationality){
        errors.nationality = 'Complete nationality'
    }else if(!/^[a-zA-Z0-9-() .]+$/.test(form.nationality)){
        errors.nationality = 'Only letters, numbers, - and ()'
    }else if(form.nationality.length<4){
        errors.nationality = 'Must have more than 4 characters'
    }


    if(!form.description){
        errors.description = 'Complete description'
    }
    if(!form.birth){
        errors.birth = 'Complete birth'
    }    
    // if(form.teams.length===0){
    //     errors.teams = 'Choose almost one team'
    // }
    if(!form.description){
        errors.description = 'Complete description'
    }
       
    return errors;
};

export default validate;