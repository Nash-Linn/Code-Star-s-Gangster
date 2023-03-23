import md5 from 'md5'

const SALT = ['code','star','gangster']

const addsalt = (password:string,salts:string[]):string=>{
  if(password.length < 3){
    throw('需加密的编码不得小于三位')
  }else{
    const star = salts[0]
    const mid = password.split('')
    mid.splice(1,0,salts[1])
    const end = salts[2]
    const res = star + mid.join('') + end
    return res
  }
}

export function encryptcode(password:string):string{
  const saltcode:string =  addsalt(password,SALT)
  return md5(saltcode)
}