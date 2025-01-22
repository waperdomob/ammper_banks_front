import withPWA from  'next-pwa' ; 
/** @type {import('next').NextConfig} */



const nextConfig = { 
    reactStrictMode : true ,       // Habilita el modo estricto de React para un mejor manejo de errores
    compiler : { 
        removeConsole : process. env . NODE_ENV !== "development"      // Elimina console.log en producción
    } 
};
export  default  withPWA ({ 
    dest : "public" ,          // directorio de destino para los archivos PWA 
    disable : process. env . NODE_ENV === "development" ,         // deshabilitar PWA en el entorno de desarrollo 
    register : true ,          // registra el service worker de PWA 
    skipWaiting : true ,       // omite la espera para la activación del service worker
})(nextConfig);

