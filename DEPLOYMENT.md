# Guía de Despliegue - Cloud Sena

## Despliegue en GitHub Pages

### 1. Configuración del Repositorio
- Ve a tu repositorio en GitHub
- Ve a **Settings** > **Pages**
- En **Source**, selecciona **GitHub Actions**

### 2. Configuración del Branch
- Asegúrate de que tu rama principal sea `main`
- El workflow se ejecutará automáticamente en cada push

### 3. Verificar la Configuración
- El proyecto ya tiene configurado:
  - `base: '/cloudsena/'` en `vite.config.js`
  - Workflow de GitHub Actions en `.github/workflows/deploy.yml`
  - Scripts de redirección para SPA

### 4. Desplegar
```bash
git add .
git commit -m "Configuración para GitHub Pages"
git push origin main
```

## Despliegue en Vercel

### 1. Conectar con Vercel
- Ve a [vercel.com](https://vercel.com)
- Conecta tu repositorio de GitHub
- Vercel detectará automáticamente la configuración

### 2. Configuración Automática
- El proyecto ya tiene configurado:
  - `vercel.json` con las reglas de reescritura
  - `base: '/cloudsena/'` en Vite
  - Rutas configuradas para SPA

### 3. Variables de Entorno (si es necesario)
- Agrega cualquier variable de entorno en el dashboard de Vercel

## Solución de Problemas

### Página en Blanco
1. **Verificar la consola del navegador** para errores JavaScript
2. **Verificar las rutas** - asegúrate de que `base: '/cloudsena/'` esté configurado
3. **Verificar el build** - ejecuta `npm run build` localmente
4. **Verificar las importaciones** - todos los componentes deben usar PascalCase

### Errores de Rutas
1. **Verificar `vercel.json`** para Vercel
2. **Verificar el workflow de GitHub Actions** para GitHub Pages
3. **Verificar que las rutas en `App.jsx`** coincidan con el `basename`

### Errores de Build
1. **Verificar dependencias** - ejecuta `npm install`
2. **Verificar versiones de Node** - usa Node.js 18+
3. **Verificar la configuración de Vite** en `vite.config.js`

## Estructura del Proyecto
```
frontend-sena/
├── .github/workflows/deploy.yml    # Workflow de GitHub Actions
├── public/
│   ├── _redirects                  # Reglas para Vercel
│   ├── 404.html                    # Redirección para GitHub Pages
│   └── index.html                  # Redirección para GitHub Pages
├── src/
│   ├── App.jsx                     # Componente principal con rutas
│   └── main.jsx                    # Punto de entrada
├── vercel.json                     # Configuración de Vercel
├── vite.config.js                  # Configuración de Vite
└── package.json                    # Dependencias y scripts
```

## Comandos Útiles

### Desarrollo Local
```bash
npm run dev
```

### Build Local
```bash
npm run build
npm run preview
```

### Verificar Build
```bash
npm run build
# Verificar que se creó la carpeta dist/
```

## Notas Importantes

1. **Base Path**: El proyecto está configurado para funcionar en `/cloudsena/`
2. **SPA Routing**: Todas las rutas se manejan a través de React Router
3. **Assets**: Los assets deben referenciarse con el base path correcto
4. **Componentes**: Todos los componentes deben usar PascalCase para evitar problemas

## Soporte

Si encuentras problemas:
1. Revisa la consola del navegador
2. Verifica los logs de build en GitHub Actions o Vercel
3. Asegúrate de que todas las dependencias estén instaladas
4. Verifica que la configuración de rutas sea consistente
