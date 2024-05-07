declare global {
  interface Window {
    services:{pluginName:string , serviceList:{[index: string]:()=>void}}[]
  }
}

export const callServiceOfPlugin = (pluginName:string,serviceName:string) =>{
  const foundPlugin = window.services.filter((service:{pluginName:string , serviceList:{[index: string]:()=>void}}) => service.pluginName === pluginName)
  if(foundPlugin.length > 0){
    return foundPlugin[0].serviceList[serviceName]();
  }else {
    console.log('no such plugin found')
  }
}
