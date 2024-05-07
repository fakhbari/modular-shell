import {container} from 'webpack';

module.exports = {
    webpack: {
        //@ts-ignore
        configure:(webpackConfig)=>{
            webpackConfig.plugins = [
                ...webpackConfig.plugins,
                new container.ModuleFederationPlugin({
                    name:'shell',
                    exposes: {
                        './Services':'./src/services.ts'
                    },
                    filename: 'remoteEntry.js',
                    library: { type: "var", name: "shell" },
                    shared:[
                        {'react':{singleton:true,strictVersion:true},
                            'react-dom':{singleton:true,strictVersion:true},
                            '@mui/material':{singleton:true,strictVersion:true},
                        }]
                })
            ]
            return webpackConfig;
        }
    },
    output:{
        publicPath:'auto'
    }
};