import React from 'react';
import { useDeviceType } from '../hooks/useDeviceType';
import DesktopSocialShare from './SocialShare.desktop.backup';
import MobileSocialShare from './SocialShare.mobile.backup';

const SocialShareWrapper = () => {
  const deviceType = useDeviceType();

  return deviceType === 'mobile' ? <MobileSocialShare /> : <DesktopSocialShare />;
};

export default SocialShareWrapper;
