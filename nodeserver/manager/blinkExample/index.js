import RLP from 'rlp'

export default (app) => {
  console.log("Hi blinkExample")
  
  try {
    let decode1 = "", decode2 = "";
    const res = RLP.decode( 0xed90416e616e746861204b726973686e616e8d526168756c204c656e6b616c618d47616e65736820507261736164 );
    for (let i = 0; i < res.length; i++) {
      for (let j = 0; j < res[i].length; j++) {
        decode1 += String.fromCharCode(res[i][j]);
      }
    }
    console.log(decode1);

    const ret = RLP.decode( 0xe5922034342e38313538393735343033373334319132302e3435343733343334343535353435)
    for (let i = 0; i < ret.length; i++) {
      for (let j = 0; j < ret[i].length; j++) {
        decode2 += String.fromCharCode(ret[i][j]);
      }
    }
    console.log(decode2);
  } catch (e) {
    console.log(e)
  }

  return app;
}
