
const isValid=(email,password)=>{
 const emailvalid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 const passwordvalid=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

 if(!emailvalid) return "Invalid Email";
 if(!passwordvalid) return "Invalid Password";
 if(emailvalid&&passwordvalid) return true;
}

export default isValid;