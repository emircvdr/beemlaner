import { GetUserSession } from '@/api/authApi';
import NotFound from '@/components/notFound';
import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
    component: () => (
        <>
            <Outlet />
            {/* <TanStackRouterDevtools /> */}
        </>
    ),
    beforeLoad: async ({ location }) => {
        const session = await GetUserSession();

        const publicPaths = ['/login', '/reset-password', '/register'];
        if (!session.session && !publicPaths.includes(location.pathname)) {
            throw redirect({
                to: '/login',
            });
        } else if (session.session && (location.pathname == '/login' || location.pathname == '/register' || location.pathname == '/reset-password')) {
            throw redirect({
                to: '/$id',
                params: {
                    id: "",
                },
            });
        }
    },
    notFoundComponent: () => {
        return <NotFound />
    }
})