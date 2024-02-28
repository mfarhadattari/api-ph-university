import { config } from '../config';
import { User } from '../modules/user/user.model';

const superAdminInfo = {
  id: config.supper_admin_id,
  email: config.supper_admin_email,
  password: config.supper_admin_password,
  role: 'superAdmin',
};

export const seedAdmin = async () => {
  // check is already a super admin
  const isSuperAdminExist = await User.findOne({ role: 'superAdmin' });
  if (!isSuperAdminExist) {
    await User.create(superAdminInfo);
  }
};
