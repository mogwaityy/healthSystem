import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';
import AddBoxIcon from '@mui/icons-material/AddBox';

export const SidebarData = [
    {
        icon: HomeIcon,
        heading: "预约管理",
        link: "/admin/dash"
    },
    {
        icon:CalendarMonthIcon,
        heading: "医生排班",
        link: "/admin/schedule"
    },
    {
        icon: DescriptionIcon,
        heading:"注册申请",
        link: "/admin/register-request"
    },
    {
        icon: AddBoxIcon,
        heading:"新增医生",
        link: "/admin/create-doctor"
    },
    {
        icon:LogoutIcon,
        heading: "退出登录",
        key:"logout",
        link: "/"
    }
]

export const SidebarData2 = [
    {
        icon: HomeIcon,
        heading: "预约管理",
        link: "/doctor/dash"
    },
    {
        icon:CalendarMonthIcon,
        heading: "排班信息",
        link: "/doctor/schedule"
    },
    {
        icon:LogoutIcon,
        heading: "退出登录",
        key:"logout",
        link: "/"
    }
]