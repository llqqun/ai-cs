interface Menu {
    label: string
    icon: string
    to: string
}

export function useMenus() {
    const router = useRouter()
    const routes = router.getRoutes()
    const menus: Menu[] = []
    routes.forEach(route => {
        if (route.meta.navHeader) {
            menus.push({
                label: route.name,
                icon: route.meta.icon,
                to: route.path
            } as Menu)

        }
    })
    return computed(() => menus)
}
