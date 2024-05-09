const path = require("path")

module.exports = {
    webpack:{
        alias:{
            '@': path.resolve(__dirname, "src/"),  // 配置别名
            '@components': path.resolve(__dirname, "src/components/"),
            '@api': path.resolve(__dirname, "src/api/"),
            '@m': path.resolve(__dirname, "src/api/m/"),
            '@action': path.resolve(__dirname, "src/api/action/"),
            
        }
    }
}