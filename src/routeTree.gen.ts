/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as pagesRouteImport } from './routes/(pages)/route'
import { Route as SetupProfileIndexImport } from './routes/setupProfile/index'
import { Route as CreateWorkspaceIndexImport } from './routes/createWorkspace/index'
import { Route as pagesProfileIndexImport } from './routes/(pages)/profile/index'
import { Route as authResetPasswordIndexImport } from './routes/(auth)/reset-password/index'
import { Route as authRegisterIndexImport } from './routes/(auth)/register/index'
import { Route as authLoginIndexImport } from './routes/(auth)/login/index'
import { Route as pagesWorkspacesIdImport } from './routes/(pages)/workspaces/$id'
import { Route as pageshomeIdImport } from './routes/(pages)/(home)/$id'

// Create/Update Routes

const pagesRouteRoute = pagesRouteImport.update({
  id: '/(pages)',
  getParentRoute: () => rootRoute,
} as any)

const SetupProfileIndexRoute = SetupProfileIndexImport.update({
  id: '/setupProfile/',
  path: '/setupProfile/',
  getParentRoute: () => rootRoute,
} as any)

const CreateWorkspaceIndexRoute = CreateWorkspaceIndexImport.update({
  id: '/createWorkspace/',
  path: '/createWorkspace/',
  getParentRoute: () => rootRoute,
} as any)

const pagesProfileIndexRoute = pagesProfileIndexImport.update({
  id: '/profile/',
  path: '/profile/',
  getParentRoute: () => pagesRouteRoute,
} as any)

const authResetPasswordIndexRoute = authResetPasswordIndexImport.update({
  id: '/(auth)/reset-password/',
  path: '/reset-password/',
  getParentRoute: () => rootRoute,
} as any)

const authRegisterIndexRoute = authRegisterIndexImport.update({
  id: '/(auth)/register/',
  path: '/register/',
  getParentRoute: () => rootRoute,
} as any)

const authLoginIndexRoute = authLoginIndexImport.update({
  id: '/(auth)/login/',
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any)

const pagesWorkspacesIdRoute = pagesWorkspacesIdImport.update({
  id: '/workspaces/$id',
  path: '/workspaces/$id',
  getParentRoute: () => pagesRouteRoute,
} as any)

const pageshomeIdRoute = pageshomeIdImport.update({
  id: '/(home)/$id',
  path: '/$id',
  getParentRoute: () => pagesRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/(pages)': {
      id: '/(pages)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof pagesRouteImport
      parentRoute: typeof rootRoute
    }
    '/createWorkspace/': {
      id: '/createWorkspace/'
      path: '/createWorkspace'
      fullPath: '/createWorkspace'
      preLoaderRoute: typeof CreateWorkspaceIndexImport
      parentRoute: typeof rootRoute
    }
    '/setupProfile/': {
      id: '/setupProfile/'
      path: '/setupProfile'
      fullPath: '/setupProfile'
      preLoaderRoute: typeof SetupProfileIndexImport
      parentRoute: typeof rootRoute
    }
    '/(pages)/(home)/$id': {
      id: '/(pages)/(home)/$id'
      path: '/$id'
      fullPath: '/$id'
      preLoaderRoute: typeof pageshomeIdImport
      parentRoute: typeof pagesRouteImport
    }
    '/(pages)/workspaces/$id': {
      id: '/(pages)/workspaces/$id'
      path: '/workspaces/$id'
      fullPath: '/workspaces/$id'
      preLoaderRoute: typeof pagesWorkspacesIdImport
      parentRoute: typeof pagesRouteImport
    }
    '/(auth)/login/': {
      id: '/(auth)/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLoginIndexImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/register/': {
      id: '/(auth)/register/'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof authRegisterIndexImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/reset-password/': {
      id: '/(auth)/reset-password/'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof authResetPasswordIndexImport
      parentRoute: typeof rootRoute
    }
    '/(pages)/profile/': {
      id: '/(pages)/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof pagesProfileIndexImport
      parentRoute: typeof pagesRouteImport
    }
  }
}

// Create and export the route tree

interface pagesRouteRouteChildren {
  pageshomeIdRoute: typeof pageshomeIdRoute
  pagesWorkspacesIdRoute: typeof pagesWorkspacesIdRoute
  pagesProfileIndexRoute: typeof pagesProfileIndexRoute
}

const pagesRouteRouteChildren: pagesRouteRouteChildren = {
  pageshomeIdRoute: pageshomeIdRoute,
  pagesWorkspacesIdRoute: pagesWorkspacesIdRoute,
  pagesProfileIndexRoute: pagesProfileIndexRoute,
}

const pagesRouteRouteWithChildren = pagesRouteRoute._addFileChildren(
  pagesRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof pagesRouteRouteWithChildren
  '/createWorkspace': typeof CreateWorkspaceIndexRoute
  '/setupProfile': typeof SetupProfileIndexRoute
  '/$id': typeof pageshomeIdRoute
  '/workspaces/$id': typeof pagesWorkspacesIdRoute
  '/login': typeof authLoginIndexRoute
  '/register': typeof authRegisterIndexRoute
  '/reset-password': typeof authResetPasswordIndexRoute
  '/profile': typeof pagesProfileIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof pagesRouteRouteWithChildren
  '/createWorkspace': typeof CreateWorkspaceIndexRoute
  '/setupProfile': typeof SetupProfileIndexRoute
  '/$id': typeof pageshomeIdRoute
  '/workspaces/$id': typeof pagesWorkspacesIdRoute
  '/login': typeof authLoginIndexRoute
  '/register': typeof authRegisterIndexRoute
  '/reset-password': typeof authResetPasswordIndexRoute
  '/profile': typeof pagesProfileIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/(pages)': typeof pagesRouteRouteWithChildren
  '/createWorkspace/': typeof CreateWorkspaceIndexRoute
  '/setupProfile/': typeof SetupProfileIndexRoute
  '/(pages)/(home)/$id': typeof pageshomeIdRoute
  '/(pages)/workspaces/$id': typeof pagesWorkspacesIdRoute
  '/(auth)/login/': typeof authLoginIndexRoute
  '/(auth)/register/': typeof authRegisterIndexRoute
  '/(auth)/reset-password/': typeof authResetPasswordIndexRoute
  '/(pages)/profile/': typeof pagesProfileIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/createWorkspace'
    | '/setupProfile'
    | '/$id'
    | '/workspaces/$id'
    | '/login'
    | '/register'
    | '/reset-password'
    | '/profile'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/createWorkspace'
    | '/setupProfile'
    | '/$id'
    | '/workspaces/$id'
    | '/login'
    | '/register'
    | '/reset-password'
    | '/profile'
  id:
    | '__root__'
    | '/(pages)'
    | '/createWorkspace/'
    | '/setupProfile/'
    | '/(pages)/(home)/$id'
    | '/(pages)/workspaces/$id'
    | '/(auth)/login/'
    | '/(auth)/register/'
    | '/(auth)/reset-password/'
    | '/(pages)/profile/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  pagesRouteRoute: typeof pagesRouteRouteWithChildren
  CreateWorkspaceIndexRoute: typeof CreateWorkspaceIndexRoute
  SetupProfileIndexRoute: typeof SetupProfileIndexRoute
  authLoginIndexRoute: typeof authLoginIndexRoute
  authRegisterIndexRoute: typeof authRegisterIndexRoute
  authResetPasswordIndexRoute: typeof authResetPasswordIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  pagesRouteRoute: pagesRouteRouteWithChildren,
  CreateWorkspaceIndexRoute: CreateWorkspaceIndexRoute,
  SetupProfileIndexRoute: SetupProfileIndexRoute,
  authLoginIndexRoute: authLoginIndexRoute,
  authRegisterIndexRoute: authRegisterIndexRoute,
  authResetPasswordIndexRoute: authResetPasswordIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/(pages)",
        "/createWorkspace/",
        "/setupProfile/",
        "/(auth)/login/",
        "/(auth)/register/",
        "/(auth)/reset-password/"
      ]
    },
    "/(pages)": {
      "filePath": "(pages)/route.tsx",
      "children": [
        "/(pages)/(home)/$id",
        "/(pages)/workspaces/$id",
        "/(pages)/profile/"
      ]
    },
    "/createWorkspace/": {
      "filePath": "createWorkspace/index.tsx"
    },
    "/setupProfile/": {
      "filePath": "setupProfile/index.tsx"
    },
    "/(pages)/(home)/$id": {
      "filePath": "(pages)/(home)/$id.tsx",
      "parent": "/(pages)"
    },
    "/(pages)/workspaces/$id": {
      "filePath": "(pages)/workspaces/$id.tsx",
      "parent": "/(pages)"
    },
    "/(auth)/login/": {
      "filePath": "(auth)/login/index.tsx"
    },
    "/(auth)/register/": {
      "filePath": "(auth)/register/index.tsx"
    },
    "/(auth)/reset-password/": {
      "filePath": "(auth)/reset-password/index.tsx"
    },
    "/(pages)/profile/": {
      "filePath": "(pages)/profile/index.tsx",
      "parent": "/(pages)"
    }
  }
}
ROUTE_MANIFEST_END */
