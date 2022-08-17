// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import { MAvatarProps } from './@material-extend/MAvatar';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: MAvatarProps) {
  const { user } = useAuth();

  return (
    <MAvatar
      src={user?.photoURL}
      alt={user?.firstName}
      color={user?.photoURL ? 'default' : createAvatar(user?.firstName).color}
      {...other}
    >
      {createAvatar(user?.firstName).name}
    </MAvatar>
  );
}
