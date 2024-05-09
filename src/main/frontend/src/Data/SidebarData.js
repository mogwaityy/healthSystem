import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';

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
        icon: DescriptionIcon,
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