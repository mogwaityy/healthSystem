import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';
import AddBoxIcon from '@mui/icons-material/AddBox';

export const SidebarData = [
    {
        icon: HomeIcon,
        heading: "Appointments",
        link: "/admin/dash"
    },
    {
        icon:CalendarMonthIcon,
        heading: "Doctor Schedule",
        link: "/admin/schedule"
    },
    {
        icon: DescriptionIcon,
        heading:"Register Request",
        link: "/admin/register-request"
    },
    {
        icon: AddBoxIcon,
        heading:"New Doctor",
        link: "/admin/create-doctor"
    },
    {
        icon:LogoutIcon,
        heading: "Lou Out",
        key:"logout",
        link: "/"
    }
]

export const SidebarData2 = [
    {
        icon: HomeIcon,
        heading: "Appointments",
        link: "/doctor/dash"
    },
    {
        icon:CalendarMonthIcon,
        heading: "Schedule",
        link: "/doctor/schedule"
    },
    {
        icon:LogoutIcon,
        heading: "Lou Out",
        key:"logout",
        link: "/"
    }
]