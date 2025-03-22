import { GetUserSession } from '@/api/authApi';
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
        if (!session.session && location.pathname !== '/login') {
            throw redirect({
                to: '/login',

            });
        } else if (session.session && (location.pathname == '/login' || location.pathname == '/register')) {
            throw redirect({
                to: '/',
            });
        }
    }
})