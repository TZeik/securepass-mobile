# 🏠 Sistema de Gestión de Visitantes para Residentes
_SECUREPASS - MOBILE (REACT - NATIVE)_

## 🚀 Tecnologías
- **Frontend**: React Native + Expo
- **API**: Axios

## 📌 Rol de los Usuarios

| Usuario              | Rol                                                                                          |
|----------------------|----------------------------------------------------------------------------------------------|
| **Residente**        | Crear/autorizar visitas, Generar QR's, Editar autorizaciones, Ver propiohistorial de visitas |
| **Guardia**          | Escanear QR's, Registrar entradas/salidas, Ver lista de residentes y su historial de visitas |
| **Administrador**    | Gestionar usuarios, Generar reportes, Configurar Sistema, Mutar rol como residente o guardia |

## 🤝 Instalación / Contribución

### Crea un Fork del proyecto
- Desde Gitub haz click en 'fork', coloca el nombre de tu repositorio y copia la rama 'main'.
- Desde Git, realiza:

```git clone <HTTPS-REPOSITORIO-FORKEADO> # Para clonar tu repositorio forkeado```

### Instala las dependencias y corre la aplicación
- Desde el directorio del proyecto realiza:

```npm install # Para instalar las dependencias```

- Luego para correr la aplicación utilizando expo:

```npx expo start --tunnel # La aplicación correra por defecto en http://localhost:8081```

### Si quieres contribuir en el proyecto
- Desde el directorio del proyecto realiza una rama a partir de la rama 'main':

```git checkout -b dev/<mi-rama> # Por ejemplo una rama de development llama 'mi-rama'```

- Puedes trabajar en esta rama, realizar commits y hacer push a tu repositorio fork

```git add . # Añade al stage todos los cambios realizados``` 

```git commit -m "<mi-commit>" # Commit de los cambios```

```git push origin dev/<mi-rama> # Sube los cambios de tu rama a tu repositorio (Por defecto el remote es origin)```
