const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.yourdomain.todolist",
        productName: "MeMo",
        mac: {
          target: "dmg",
          icon: "build/mac/icon.icns",
          category: "public.app-category.productivity"
        },
        dmg: {
          icon: "build/mac/icon.icns",
          iconSize: 80,
          contents: [
            {
              x: 130,
              y: 150,
              type: "link",
              path: "/Applications"
            },
            {
              x: 220,
              y: 150,
              type: "file",
              path: "dist_electron/mac-arm64/MeMo.app"
            }
          ]
        },
        files: [
          "**/*"
        ],
        directories: {
          output: "dist_electron"
        }
      }
    }
  }
})
