const VerifyLocation = async(): Promise<[number,number]> => {
  return new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                resolve([position.coords.latitude,position.coords.longitude])
            },
            (error) =>{
              reject(false)
            }
        )
  })
}

export default VerifyLocation
