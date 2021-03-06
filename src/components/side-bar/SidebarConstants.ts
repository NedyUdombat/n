/** Inactive Icon(s) */
import HomeIcon from '../../assets/icons/tab-icons/Home.svg';
import BoxIcon from '../../assets/icons/tab-icons/Box.svg';
import WalletIcon from '../../assets/icons/tab-icons/Wallet.svg';
import CogIcon from '../../assets/icons/tab-icons/Cog.svg';

/** Active Icon(s) */
import HomeActiveIcon from '../../assets/icons/tab-icons/HomeActive.svg';
import BoxActiveIcon from '../../assets/icons/tab-icons/BoxActive.svg';
import WalletActiveIcon from '../../assets/icons/tab-icons/WalletActive.svg';
import CogActiveIcon from '../../assets/icons/tab-icons/CogActive.svg';

/**  Util(s) */
import { ROUTE_URLS } from '../../routes/RouteUrls';

export const menuArray = [
  {
    name: 'Home',
    path: ROUTE_URLS.HOME_PAGE,
    icon: HomeIcon,
    iconActive: HomeActiveIcon,
  },
  {
    name: 'Micro Pension',
    path: ROUTE_URLS.MICRO_PENSION,
    icon: BoxIcon,
    iconActive: BoxActiveIcon,
  },
  {
    name: 'Wallet',
    path: ROUTE_URLS.WALLET,
    icon: WalletIcon,
    iconActive: WalletActiveIcon,
  },
  {
    name: 'Settings',
    path: ROUTE_URLS.SETTINGS,
    icon: CogIcon,
    iconActive: CogActiveIcon,
  },
];
