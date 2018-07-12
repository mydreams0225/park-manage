var data = [
    {
        path: '/home',
        name: '首页'
    },
    {
        name: '停车场管理',
        child: [
            {
                name: '停车场列表',
                path: '/parklist'
            },
            {
                name: '在场',
                child: [
                    {
                        path: '/components/permission',
                        name: '详细鉴权'
                    },
                    {
                        path: '/components/pageTable',
                        name: '表格分页'
                    }
                ]
            }
        ]
    }
]    