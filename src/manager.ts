//@ts-noCheck
import axios from "axios";
import * as React from "react";
import {importRemote} from "@module-federation/utilities";

declare global {
  interface Window {
    services:{pluginName:string , serviceList:{[index: string]:()=>void}}[]
  }
}

export const getPluginsInManager = ()=>{
  return axios.get('http://localhost:7000/plugins')
    .then(resp => {
      const receivedPlugin = resp.data;
      const pluginsRoute = receivedPlugin && receivedPlugin.map(async plugin => {
        return {
          path: `/${plugin.scope}`,
          component: React.lazy(() => importRemote({
            url: plugin.url,
            scope: plugin.scope,
            module: plugin.module,
          }).catch((error) => {
            return {default: () => `no module found or module is not working`};
          })),
          services:plugin.service
            ? await importRemote({
              url: plugin.url,
              scope: plugin.scope,
              module: plugin.service,
            }).catch(() => {
              return 'no service found';
            })
            : null,
          icon: plugin.icon,
          title: plugin.title,
          id:plugin.id
        }
      })
      return Promise.all(pluginsRoute)
    }).then(pluginList =>{
      window.services = []
      pluginList.forEach(plugin=>{
        window.services.push({pluginName:plugin.title , serviceList:plugin.services})
      })
      return pluginList;
    })
    .catch(error => {
      console.log(error);
    });

}
