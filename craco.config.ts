import {container} from 'webpack';

module.exports = {
    webpack: {
        //@ts-ignore
        configure:(webpackConfig)=>{
            webpackConfig.plugins = [
                ...webpackConfig.plugins,
                new container.ModuleFederationPlugin({
                    name:'shell',
                    library: { type: "var", name: "shell" },
                    shared:['react']
                })
            ]
            return webpackConfig;
        }
    },
    output:{
        publicPath:'auto'
    }
};