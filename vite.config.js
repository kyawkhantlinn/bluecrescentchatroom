import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    publicDir:"../public",
    root:"./src",
    build:{
        outDir:"../dist", // define the output directory, the output directory to build files
        rollupOptions:{
            input:{
                main:"./src/index.html",
                profile:"./src/profile.html",
                reset:"./src/reset.html",
                signin:"./src/signin.html",
                signup:"./src/signup.html"
            }
        }
    },
    server:{
        watch:{
            usePolling:true
        }
    },
    plugins: [
        tailwindcss(),
    ]
});