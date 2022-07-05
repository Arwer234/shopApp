const validation = {
    validateEmail(input:string){
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(input.match(validRegex) === null || input.match(validRegex) === undefined){
            return {valid:false,reasons:["NOT_AN_EMAIL"]}
        }
        else{
            let valid = input.match(validRegex)!.length>0
            return {valid, reasons:valid?[]:["NOT_AN_EMAIL"]}
        }
        
    },
    validatePassword(input:string){
        let reasons = []
        if(input.length<6) reasons.push("TOO_SHORT")
        if(input.length > 20) reasons.push("TOO_LONG")
        if(input.toLowerCase() === input) reasons.push("NO_UPPERCASE")

        return {valid:reasons.length===0, reasons}
    },
    validateUsername(input:string){
        let reasons = []
        if(input.length<5) reasons.push("TOO_SHORT")
        if(input.length>20) reasons.push("TOO_LONG")
        console.log("reasons: " + reasons.length)
        return {valid:reasons.length===0,reasons}
    }
} 
export default validation