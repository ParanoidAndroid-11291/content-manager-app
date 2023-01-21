import { ADD_RESOURCE_PATH, HOME_PATH } from 'routes';
import { useRouter } from 'next/router';

import Link from 'next/Link';

const HeaderBar = () => {
  const router = useRouter();

  return (
    <div className="ui stackable menu">
      <div className="header item">
        My App
      </div>
      <Link  href={ HOME_PATH }>
        <a className={
          router.pathname === HOME_PATH ?
          `active item` :
          `item` }>
            Home
        </a>
      </Link>
      <Link  href={ ADD_RESOURCE_PATH }>
        <a className={
          router.pathname === ADD_RESOURCE_PATH ?
          `active item` :
          `item` }>
            Add
        </a>
      </Link>
      <a className="item">About</a>
    </div>
  );
};

export default HeaderBar;
